import React, { useEffect, useState } from "react";

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
import { Line } from "react-chartjs-2";

import {
  backgroundColorPlugin,
  fetchData,
  getChartOptions,
  prepareLineDiagramData,
} from "../utils/lineChartHelpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
  annotationPlugin,
  backgroundColorPlugin
);

export default function ClimateData({ municipalityId, scenario }) {
  const [municipalityData, setMunicipalityData] = useState([]);

  const API_ENDPOINT = `http://127.0.0.1:8000/api/v1/municipalitydata/${municipalityId}`;

  useEffect(() => {
    fetchData(API_ENDPOINT).then((data) => setMunicipalityData(data));
  }, [municipalityId, scenario]);

  if (municipalityData.length === 0) {
    return <div>Loading...</div>;
  }

  const chartData = prepareLineDiagramData(
    municipalityData.meta.analysisTimeRange,
    municipalityData.historical.rawData,
    municipalityData.meta.ensembleTimeRange,
    municipalityData.ensemble[scenario]
  );

  const chartOptions = getChartOptions();

  return <Line options={chartOptions} data={chartData} />;
}
