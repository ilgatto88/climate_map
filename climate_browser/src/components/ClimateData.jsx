import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
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

// Custom Utils
import "../styles/ClimateData.css";
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

export default function ClimateData({
  municipalityId,
  scenario,
  historicalPeriod,
  futurePeriod,
  parameter,
  showChart,
  handleClose,
  hideHistoricalData,
}) {
  const [municipalityData, setMunicipalityData] = useState([]);
  const [municipalityMeta, setMunicipalityMeta] = useState({});

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
    parameterName: "Mean temperature (°C)",
    chartMinimum: absoluteChartMinimum,
    chartMaximum: absoluteChartMaximum,
    futurePeriodStart,
    futurePeriodEnd,
  });

  return (
    <Offcanvas
      show={showChart}
      onHide={handleClose}
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
        parameter={parameter}
        scenario={scenario}
        historicalPeriod={historicalPeriod}
        futurePeriod={futurePeriod}
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

ClimateData.propTypes = {
  municipalityId: PropTypes.string.isRequired,
  scenario: PropTypes.string.isRequired,
  historicalPeriod: PropTypes.string.isRequired,
  futurePeriod: PropTypes.string.isRequired,
  parameter: PropTypes.string.isRequired,
  showChart: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  hideHistoricalData: PropTypes.bool.isRequired,
};
