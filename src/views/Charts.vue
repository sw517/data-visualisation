<template>
  <main class="home">
    <div class="container text-center p-4 mx-auto">
      <button class="btn" @click="toggleChartType">Toggle Chart Type</button>
    </div>
    <div class="container px-4 mx-auto">
      <div class="row">
        <div class="column">
          <span class="text-xl">Gender</span>
          <DynamicChart
            v-if="genders && Object.keys(genders).length"
            class="px-4"
            :type="chartType"
            :labels="genders.labels"
            :datasets="[
              {
                label: 'Gender',
                data: genders.data,
                backgroundColor: genders.backgroundColor,
              },
            ]"
          />
        </div>
        <div class="column">
          <span class="text-xl">Eye Color</span>
          <DynamicChart
            v-if="eyeColors && Object.keys(eyeColors).length"
            class="px-4"
            :type="chartType"
            :labels="eyeColors.labels"
            :datasets="[
              {
                label: 'Eye Color',
                data: eyeColors.data,
                backgroundColor: eyeColors.backgroundColor,
              },
            ]"
          />
        </div>
        <div class="px-4 mb-6">
          <span class="text-xl">Age</span>
          <DynamicChart
            v-if="ages && Object.keys(ages).length"
            class="px-4"
            :type="chartType"
            :labels="ages.labels"
            :datasets="[
              {
                label: 'Age',
                data: ages.data,
                backgroundColor: ages.backgroundColor,
              },
            ]"
          />
        </div>
        <div class="column">
          <span class="text-xl">Preferred Pet</span>
          <DynamicChart
            v-if="pets && Object.keys(pets).length"
            class="px-4"
            :type="chartType"
            :labels="pets.labels"
            :datasets="[
              {
                label: 'Preferred Pet',
                data: pets.data,
                backgroundColor: pets.backgroundColor,
              },
            ]"
          />
        </div>
        <div class="column">
          <span class="text-xl">Preferred Fruit</span>
          <DynamicChart
            v-if="fruits && Object.keys(fruits).length"
            class="px-4"
            :type="chartType"
            :labels="fruits.labels"
            :datasets="[
              {
                label: 'Preferred Fruit',
                data: fruits.data,
                backgroundColor: fruits.backgroundColor,
              },
            ]"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// Helpers
import { mapGetters } from 'vuex';
import randomColor from '@/utils/randomColor';
// Mixins
import getDataset from '@/mixins/getDataset';
// Components
import DynamicChart from '@/components/charts/DynamicChart.vue';

export default {
  name: 'Home',
  components: {
    DynamicChart,
  },
  mixins: [getDataset],
  data() {
    return {
      chartType: 'pie',
      groupAge: true,
    };
  },
  computed: {
    ...mapGetters(['people']),
    dataExists() {
      return this.people.length;
    },
    genders() {
      if (!this.dataExists) return null;

      return this.getDataset(this.people, 'gender');
    },
    eyeColors() {
      if (!this.dataExists) return null;

      return this.getDataset(this.people, 'eyeColor');
    },
    ages() {
      if (!this.dataExists) return null;

      if (this.groupAge) {
        const dataset = {};
        const backgroundColor = [];
        const data = [];
        const labels = [];
        const counterInitial = [
          { min: 0, max: 20, count: 0, label: 'Under 21' },
          { min: 21, max: 25, count: 0 },
          { min: 26, max: 30, count: 0 },
          { min: 31, max: 35, count: 0 },
          { min: 36, max: 40, count: 0 },
          { min: 41, max: 45, count: 0 },
          { min: 46, max: 50, count: 0 },
          { min: 51, max: 999, count: 0, label: '51 +' },
        ];

        this.people.forEach((person) => {
          const { age } = person;

          counterInitial.forEach((ageGroup) => {
            if (Number(age) >= ageGroup.min && Number(age) <= ageGroup.max) {
              ageGroup.count += 1;
            }
          });
        });

        counterInitial.forEach((ageGroup) => {
          data.push(ageGroup.count);
          labels.push(ageGroup.label || `${ageGroup.min} - ${ageGroup.max}`);
          backgroundColor.push(randomColor());
        });

        Object.assign(dataset, { labels, data, backgroundColor });

        return dataset;
      } else {
        return this.getDataset(this.people, 'age');
      }
    },
    pets() {
      if (!this.dataExists) return null;

      return this.getDataset(this.people, 'preferences.pet');
    },
    fruits() {
      if (!this.dataExists) return null;

      return this.getDataset(this.people, 'preferences.fruit');
    },
  },
  methods: {
    toggleChartType() {
      this.chartType = this.chartType === 'pie' ? 'bar' : 'pie';
    },
  },
};
</script>
