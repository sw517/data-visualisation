<template>
  <div class="home">
    <DynamicChart :type="chartType" :labels="['Red', 'Green']" :datasets="[{label: 'Color', data: [5, 4]}]" />
    <button @click="chartType = 'pie'">Toggle Chart Type</button>
  </div>
</template>

<script>
// Helpers
import axios from 'axios';
import { mapActions } from 'vuex';
// Components
import DynamicChart from '@/components/charts/DynamicChart.vue';

export default {
  name: 'Home',
  components: {
    DynamicChart,
  },
  data() {
    return {
      chartType: 'bar',
    };
  },
  created() {
    axios.get('https://updates.suade.org/files/people.json')
      .then((response) => {
        this.setPeople(response.data);
      });
  },
  methods: {
    ...mapActions(['setPeople']),
  },
};
</script>
