<template>
  <div class="bar-chart">
    <canvas ref="canvas" height="300" width="300" />
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'BarChart',
  props: {
    type: {
      type: String,
      default: 'bar',
      valid(type) {
        return ['bar', 'line', 'pie'].includes(type);
      },
    },
    labels: {
      type: Array,
      default: () => [],
    },
    datasets: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chart: {},
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
      handler() {
        this.updateChart();
      },
      deep: true,
    },
  },
  mounted() {
    this.chart = this.renderChart();
  },
  methods: {
    renderChart() {
      const { canvas } = this.$refs;
      if (!canvas) return null;

      return new Chart(canvas.getContext('2d'), {
        type: this.type,
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
      });
    },
    updateChartType() {
      if (!Object.keys(this.chart).length) return;

      this.chart.destroy();
      this.renderChart();
    },
    updateChart() {
      if (!Object.keys(this.chart).length) return;

      this.chart.datasets = this.datasets;
      this.chart.labels = this.labels;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
