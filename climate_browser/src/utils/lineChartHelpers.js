const TENSION = 0.3;
const WHITE_DIAGRAM_COLOR = "rgba(255, 255, 255, 0.8)";

export function lineChartAnnotationPaddingCalculator(maximum) {
  if (maximum < 20) {
    return 0.5;
  }

  if (maximum < 50) {
    return 1;
  }
  if (maximum < 100) {
    return 2;
  }
  if (maximum < 200) {
    return 3;
  }
  return 3.5;
}

/* istanbul ignore next */
export function getChartOptions({
  parameterName,
  chartMinimum,
  chartMaximum,
  futurePeriodStart,
  futurePeriodEnd,
}) {
  let delayed = false;
  const annotationBoxStart = futurePeriodStart - 1961;
  const annotationBoxEnd = futurePeriodEnd - 1961;
  const annotationCenter = Math.ceil(annotationBoxStart + annotationBoxEnd) / 2;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    hitRadius: 10,
    hoverRadius: 5,
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 5;
        }
        return delay;
      },
    },
    interaction: {
      mode: "index",
    },
    tooltips: {
      enabled: true,
      mode: "index",
      usePointStyle: true,
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: false,
          drawTicks: true,
          tickLength: 10,
          tickWidth: 1,
          tickColor: WHITE_DIAGRAM_COLOR,
        },
        min: 1970,
        max: 2100,
        ticks: {
          color: WHITE_DIAGRAM_COLOR,
          maxTicksLimit: 14,
        },
        title: {
          display: true,
          text: "Year",
          color: WHITE_DIAGRAM_COLOR,
          fontSize: 14,
        },
        display: true,
      },
      y: {
        grid: {
          display: true,
          color: WHITE_DIAGRAM_COLOR,
          drawTicks: false,
        },
        min: chartMinimum,
        max: chartMaximum,
        ticks: {
          beginAtZero: false,
          color: WHITE_DIAGRAM_COLOR,
        },
        title: {
          display: true,
          text: parameterName,
          color: WHITE_DIAGRAM_COLOR,
          fontSize: 14,
        },
        display: true,
      },
    },
    hover: {
      mode: "nearest",
      axis: "x",
      intersect: false,
      includeInvisible: true,
    },
    plugins: {
      background: {
        color: "rgba(99, 88, 88, 0.1)",
      },
      tooltip: {
        filter: (tooltipItem) => !tooltipItem.dataset.label.includes("remove"),
      },

      annotation: {
        annotations: {
          box1: {
            drawTime: "beforeDatasetsDraw",
            type: "box",
            xMin: annotationBoxStart,
            xMax: annotationBoxEnd,
            yMin: chartMinimum,
            yMax: chartMaximum,
            backgroundColor: "rgba(201, 204, 199,0.5)",
            borderColor: "rgba(230,97,79,0.0)",
          },
          label1: {
            type: "label",
            xValue: annotationCenter,
            yValue:
              chartMaximum - lineChartAnnotationPaddingCalculator(chartMaximum),
            color: "rgb(255, 255, 255)",
            content: [`${futurePeriodStart}-${futurePeriodEnd}`],
            font: {
              size: 12,
            },
          },
        },
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          // eslint-disable-next-line no-unused-vars
          filter(item, chart) {
            return !item.text.includes("remove");
          },
          color: WHITE_DIAGRAM_COLOR,
        },
      },
      title: {
        display: false,
        text: "Climate Data",
      },
    },
  };
  return chartOptions;
}

export function insertNullValues(data, timeRange, startYear, endYear) {
  const output = [];
  let timeRangeIndex = 0;

  for (let year = startYear; year <= endYear; year++) {
    if (year === timeRange[timeRangeIndex]) {
      output.push(data[timeRangeIndex]);
      timeRangeIndex++;
    } else {
      output.push(null);
    }
  }

  return output;
}

export async function fetchData(API_ENDPOINT) {
  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

export function prepareLineDiagramData(
  historicalData,
  ensembleData,
  hideHistoricalData,
  startYear,
  endYear
) {
  const historicalFilledData = insertNullValues(
    historicalData.rawData,
    historicalData.analysisTimeRange,
    startYear,
    endYear
  );

  const ensembleMedian = insertNullValues(
    ensembleData.statistics1D.median,
    ensembleData.ensembleTimeRange,
    startYear,
    endYear
  );

  const chartData = [];

  chartData.push({
    hidden: hideHistoricalData,
    label: "Historical",
    borderColor: "#778ed9",
    backgroundColor: "#778ed9",
    data: historicalFilledData,
    fill: false,
    pointRadius: 1,
    borderWidth: 2,
    tension: TENSION,
  });

  chartData.push({
    label: "Ensemble median",
    backgroundColor: "#000000",
    borderColor: "#000000",
    data: ensembleMedian,
    fill: false,
    pointRadius: 1,
    borderWidth: 2,
    tension: TENSION,
  });

  Object.keys(ensembleData.rawData).forEach((key) => {
    const data = insertNullValues(
      ensembleData.rawData[key],
      ensembleData.ensembleTimeRange,
      startYear,
      endYear
    );
    const obj = {
      data,
      label: `${key}_remove`,
      fill: false,
      pointRadius: 0,
      borderWidth: 10,
      backgroundColor: "rgba(237, 31, 17, 0.15)",
      borderColor: "rgba(237, 31, 17, 0.15)",
      tension: 0.3,
    };
    chartData.push(obj);
  });

  const data = {
    labels: range(startYear, endYear),
    datasets: chartData,
  };
  return data;
}

/* istanbul ignore next */
export const backgroundColorPlugin = {
  id: "background",
  beforeDraw: (chart, args, opts) => {
    if (!opts.color) {
      return;
    }

    const { ctx, chartArea } = chart;

    ctx.fillStyle = opts.color;
    ctx.fillRect(
      chartArea.left,
      chartArea.top,
      chartArea.width,
      chartArea.height
    );
  },
};
