import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Line } from "react-chartjs-2";
import Offcanvas from "react-bootstrap/Offcanvas";

// External Libraries (chart.js)
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
import { close } from "../features/sidebarSlice";

// Custom Utils
import "../styles/OffCanvasLineDiag.css";
import "bootstrap/dist/css/bootstrap.css";
import OffCanvasSubHeader from "./OffCanvasSubHeader";

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
  const [municipalityData, setMunicipalityData] = useState([]);
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

  const API_ENDPOINT = `http://127.0.0.1:8000/api/v1/municipalitydata/${municipalityId}`;
  const API_META_ENDPOINT = `http://127.0.0.1:8000/api/v1/municipalities/${municipalityId}`;

  useEffect(() => {
    fetchData(API_ENDPOINT).then((data) => setMunicipalityData(data));
  }, [municipalityId, scenario]);

  useEffect(() => {
    fetchData(API_META_ENDPOINT).then((data) => setMunicipalityMeta(data));
  }, [municipalityId]);

  if (municipalityData.length === 0) {
    return <div>Loading...</div>;
  }

  if (sidebarState) {
    const offCanvasCloseButton = document.querySelector(".btn-close");
    console.log(offCanvasCloseButton);
    if (offCanvasCloseButton !== null) {
      offCanvasCloseButton.classList.add("btn-close-white");
    }
  }

  const chartData = prepareLineDiagramData(
    scenario,
    municipalityData.meta.analysisTimeRange,
    municipalityData.historical.rawData,
    municipalityData.meta.ensembleTimeRange,
    municipalityData.ensemble[scenario],
    hideHistoricalData,
    municipalityData.ensemble[scenario].rawData
  );

  const historicalValue =
    municipalityData.historical.statistics0D[historicalPeriod].mean.toFixed(1);
  const ensembleValue =
    municipalityData.ensemble[scenario].statistics0D[futurePeriod].mean.toFixed(
      1
    );

  const climateChangeValue = (ensembleValue - historicalValue).toFixed(1);
  const changeUpDownText = climateChangeValue > 0 ? "Up " : "Down";
  const changeUpDownCaret = climateChangeValue > 0 ? faCaretUp : faCaretDown;
  const changeText = (
    <div className="prehead">
      {changeUpDownText} &nbsp; <FontAwesomeIcon icon={changeUpDownCaret} />
    </div>
  );

  const historicalMinimum = Math.min(...municipalityData.historical.rawData);
  const ensembleMinimum = Math.min(
    ...municipalityData.ensemble[scenario].statistics1D.minimum
  );
  const absoluteChartMinimum = Math.floor(
    Math.min(historicalMinimum, ensembleMinimum)
  );

  const historicalMaximum = Math.max(...municipalityData.historical.rawData);
  const ensembleMaximum = Math.max(
    ...municipalityData.ensemble[scenario].statistics1D.maximum
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
      // eslint-disable-next-line react/jsx-boolean-value
      scroll={true}
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
