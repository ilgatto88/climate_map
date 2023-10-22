import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

// Custom Utils
import "bootstrap/dist/css/bootstrap.css";
import "../styles/OffCanvasLineDiag.css";
import OffCanvasSubHeader from "./OffCanvasSubHeader";

import { close } from "../features/sidebarSlice";
import Config from "../data/config.json";

import {
  backgroundColorPlugin,
  fetchData,
  getChartOptions,
  prepareLineDiagramData,
} from "../utils/lineChartHelpers";

ChartJS.register(
  annotationPlugin,
  backgroundColorPlugin,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip
);

export default function OffCanvasLineDiag() {
  const [municipalityHistoricalData, setMunicipalityHistoricalData] = useState(
    []
  );
  const [municipalityScenarioData, setMunicipalityScenarioData] = useState([]);
  const [municipalityMeta, setMunicipalityMeta] = useState({});

  const sidebarState = useSelector((state) => state.sidebarHandler.value);
  const municipalityId = useSelector(
    (state) => state.municipalityIdHandler.value
  );
  const scenario = useSelector((state) => state.scenarioHandler.value);
  const futurePeriod = useSelector((state) => state.futurePeriodHandler.value);
  const historicalPeriod = useSelector(
    (state) => state.historicalPeriodHandler.value
  );
  const hideHistoricalData = useSelector(
    (state) => state.historicalDataHandler.value
  );
  const parameter = useSelector((state) => state.parameterHandler.value);
  const dispatch = useDispatch();

  const API_HISTORICAL_ENDPOINT = `${Config.API_BASE_URL}municipalitydata/historical/${parameter}/${municipalityId}`;
  const API_SCENARIO_ENDPOINT = `${Config.API_BASE_URL}municipalitydata/scenario/${scenario}/${parameter}/${municipalityId}`;
  const API_META_ENDPOINT = `${Config.API_BASE_URL}municipalities/${municipalityId}`;

  useEffect(() => {
    fetchData(API_HISTORICAL_ENDPOINT).then((data) =>
      setMunicipalityHistoricalData(data)
    );
  }, [municipalityId]);

  useEffect(() => {
    fetchData(API_SCENARIO_ENDPOINT).then((data) =>
      setMunicipalityScenarioData(data)
    );
  }, [municipalityId, scenario]);

  useEffect(() => {
    fetchData(API_META_ENDPOINT).then((data) => setMunicipalityMeta(data));
  }, [municipalityId]);

  if (municipalityHistoricalData.length === 0) {
    return <div>Loading historical data...</div>;
  }

  if (municipalityScenarioData.length === 0) {
    return <div>Loading scenario data...</div>;
  }

  if (sidebarState) {
    const offCanvasCloseButton = document.querySelector(".btn-close");
    if (offCanvasCloseButton !== null) {
      offCanvasCloseButton.classList.add("btn-close-white");
    }
  }

  const chartData = prepareLineDiagramData(
    municipalityHistoricalData,
    municipalityScenarioData,
    hideHistoricalData
  );

  const historicalValue =
    municipalityHistoricalData.statistics0D[historicalPeriod].mean.toFixed(1);
  const ensembleValue =
    municipalityScenarioData.statistics0D[futurePeriod].mean.toFixed(1);

  const climateChangeValue = (ensembleValue - historicalValue).toFixed(1);
  const changeUpDownText = climateChangeValue > 0 ? "Up " : "Down";
  const changeUpDownCaret = climateChangeValue > 0 ? faCaretUp : faCaretDown;
  const changeText = (
    <div className="prehead">
      {changeUpDownText} &nbsp; <FontAwesomeIcon icon={changeUpDownCaret} />
    </div>
  );

  const historicalMinimum = Math.min(...municipalityHistoricalData.rawData);
  const ensembleMinimum = Math.min(
    ...municipalityScenarioData.statistics1D.minimum
  );
  const absoluteChartMinimum = Math.floor(
    Math.min(historicalMinimum, ensembleMinimum)
  );

  const historicalMaximum = Math.max(...municipalityHistoricalData.rawData);
  const ensembleMaximum = Math.max(
    ...municipalityScenarioData.statistics1D.maximum
  );
  const absoluteChartMaximum = Math.ceil(
    Math.max(historicalMaximum, ensembleMaximum)
  );

  const futurePeriodStart = parseInt(futurePeriod.split("-")[0], 10);
  const futurePeriodEnd = parseInt(futurePeriod.split("-")[1], 10);

  const chartOptions = getChartOptions({
    parameterName: parameter,
    chartMinimum: absoluteChartMinimum,
    chartMaximum: absoluteChartMaximum,
    futurePeriodStart,
    futurePeriodEnd,
  });

  return (
    <Offcanvas
      show={sidebarState}
      onHide={() => dispatch(close())}
      placement="end"
      backdrop={false}
      scroll
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <div className="d-flex flex-column">
            <h3 className="text-main-name">Municipality</h3>
            <h1 className="text-main-value text-uppercase">
              {municipalityMeta.name}
            </h1>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <OffCanvasSubHeader
        historicalValue={historicalValue}
        ensembleValue={ensembleValue}
        climateChangeValue={climateChangeValue}
        changeText={changeText}
      />
      <Offcanvas.Body>
        <Line options={chartOptions} data={chartData} />
      </Offcanvas.Body>
    </Offcanvas>
  );
}
