<template>
  <div class="bar-chart">
    <canvas ref="canvas" height="260" width="260" />
  </div>
</template>

<script>
import Chart from 'chart.js';
import merge from 'lodash.merge';

export default {
  name: 'BarChart',
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
    this.chart = this.renderChart();
  },
  methods: {
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
    renderChart() {
      const { canvas } = this.$refs;
      if (!canvas || !this.labels.length || !this.datasets.length) return null;

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
                    // only show whole numbers
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
    updateChartType() {
      if (!Object.keys(this.chart).length) return;

      this.chart.destroy();
      this.chart = this.renderChart();
    },
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
