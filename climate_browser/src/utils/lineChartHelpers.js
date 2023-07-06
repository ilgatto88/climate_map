const TENSION = 0.3;

export function getChartOptions() {
    let delayed = false;

    const chartOptions = {
    responsive: true,
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
            display: false,
        },
        title: {
            display: true,
            text: "Year",
        },
        display: true,
        },
        y: {
        title: {
            display: true,
            text: "Mean temperature (°C)",
            fontSize: 14,
        },
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
        color: "#FFFFFF",
        },
        annotation: {
        annotations: {
            box1: {
            drawTime: "beforeDatasetsDraw",
            type: "box",
            xMin: 75,
            xMax: 105,
            yMin: 8,
            yMax: 13,
            backgroundColor: "rgba(201, 204, 199,0.5)",
            borderColor: "rgba(230,97,79,0.0)",
            },
            label1: {
            type: "label",
            xValue: 90,
            yValue: 12.9,
            backgroundColor: "rgba(245,245,245, 0.0)",
            content: ["2036-2065"],
            font: {
                size: 12,
            },
            },
        },
        },
        legend: {
        position: "bottom",
        labels: {
            filter: function (item, chart) {
            return !item.text.includes("remove");
            },
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


export function prepareLineDiagramData(analysisTimeRange, historicalRawData, ensembleTimeRange, ensembleData) {

    const historicalData = insertNullValues(
        historicalRawData,
        analysisTimeRange,
        1961,
        2100
      );
      const rcp26Median = insertNullValues(
        ensembleData.statistics1D.median,
        ensembleTimeRange,
        1961,
        2100
      );
      const rcp26Lower = insertNullValues(
        ensembleData.statistics1D.lowerPercentile,
        ensembleTimeRange,
        1961,
        2100
      );
      const rcp26Upper = insertNullValues(
        ensembleData.statistics1D.upperPercentile,
        ensembleTimeRange,
        1961,
        2100
      );

    let data = {
      labels: range(1961, 2100),
      datasets: [
        {
          label: "Historical",
          borderColor: "#A99D9D",
          backgroundColor: "#A99D9D",
          data: historicalData,
          fill: false,
          pointRadius: 1,
          borderWidth: 2,
          tension: TENSION,
        },
        {
          label: "RCP 2.6",
          backgroundColor: "#AEC99E",
          borderColor: "#AEC99E",
          data: rcp26Median,
          fill: false,
          pointRadius: 1,
          borderWidth: 2,
          tension: TENSION,
        },
        {
          label: "Upper percentile",
          borderColor: "rgba(255, 255, 255, 0.0)",
          data: rcp26Upper,
          fill: false,
          pointRadius: 1,
          tension: TENSION,
        },
        {
          label: "Lower percentile",
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 250);
            gradient.addColorStop(0, "rgba(174,201,158,1)");
            gradient.addColorStop(1, "rgba(226,238,219,1)");
            return gradient;
          },
          borderColor: "rgba(255, 255, 255, 0.0)",
          data: rcp26Lower,
          fill: "-1",
          pointRadius: 1,
          tension: TENSION,
        },
      ],
    };
    return data;
  }

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