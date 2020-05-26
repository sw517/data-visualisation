<template>
  <div class="dynamic-chart">
    <canvas ref="canvas" height="260" width="260" />
  </div>
</template>

<script>
import Chart from 'chart.js';
import merge from 'lodash.merge';

export default {
  name: 'DynamicChart',
  props: {
    type: {
      type: String,
      default: 'bar',
      valid(type) {
        return ['bar', 'pie'].includes(type);
      },
    },
    labels: {
      type: Array,
      default: () => [],
      required: true,
    },
    datasets: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      chart: {},
      datasetsMerged: {},
    };
  },
  watch: {
    type() {
      this.updateChartType();
    },
    labels() {
      this.updateChart();
    },
    datasets: {
      handler(newVal, oldVal) {
        if (newVal.data && oldVal.data) {
          if (newVal.data.datasets !== oldVal.data.datasets) {
            this.updateChart();
          }
        }
      },
      deep: true,
    },
  },
  created() {
    this.setUpDatasets();
  },
  mounted() {
    // Initialise the chart and store reference in this.chart.
    this.chart = this.renderChart();
  },
  methods: {
    /**
     * Set up the default values for the chart datasets
     * to be merged with the data receieved from props.
     */
    setUpDatasets() {
      const datasetsDefault = {
        labels: [],
        datasets: [
          {
            data: [],
            borderColor: '#333',
            borderWidth: 1,
          },
        ],
      };

      this.datasetsMerged = Object.assign(
        {},
        merge(datasetsDefault, { labels: this.labels }, { datasets: this.datasets })
      );
    },
    /**
     * Render the chart to the canvas if the element exists
     * and the data is valid.
     */
    renderChart() {
      const { canvas } = this.$refs;
      if (
        !canvas ||
        !Object.keys(this.datasetsMerged).length ||
        !this.datasetsMerged.datasets.length ||
        !this.datasetsMerged.labels.length
      )
        return null;

      return new Chart(canvas.getContext('2d'), {
        type: this.type,
        data: {
          labels: this.datasetsMerged.labels,
          datasets: this.datasetsMerged.datasets,
        },
        options: {
          legend: {
            display: this.type === 'pie',
          },
          scales: {
            yAxes: [
              {
                display: this.type === 'bar',
                ticks: {
                  beginAtZero: true,
                  userCallback: (label) => {
                    // Only show whole numbers
                    if (Math.floor(label) === label) {
                      return label;
                    }
                  },
                },
              },
            ],
          },
        },
      });
    },
    /**
     * Change the chart type. The chart cannot simply
     * update the type once rendered. The chart must
     * be destroyed and rerendered.
     */
    updateChartType() {
      if (!Object.keys(this.chart).length) return;

      this.chart.destroy();
      this.chart = this.renderChart();
    },
    /**
     * Call the chart's update method to correctly
     * render the new data.
     */
    updateChart() {
      if (!Object.keys(this.chart).length) return;

      this.setUpDatasets();
      this.chart.data.labels = this.datasetsMerged.labels;
      this.chart.data.datasets = this.datasetsMerged.datasets;
      this.chart.update();
    },
  },
};
</script>

<style lang="scss" scoped></style>
