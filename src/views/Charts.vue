<template>
  <main class="charts">
    <div class="container text-center">
      <div class="row">
        <div class="column">
          <h1 class="mb-4 text-xl">Charts</h1>
          <button class="btn" @click="toggleChartType">Toggle Chart Type</button>
        </div>
      </div>
    </div>
    <div class="container">
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
        <div class="column">
          <div class="flex justify-center">
            <span class="text-xl mr-4">Age</span>
            <div class="flex justify-center items-center">
              <input id="group-age" v-model="groupAge" class="mr-2" type="checkbox" />
              <label for="group-age">grouped</label>
            </div>
          </div>

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
import DynamicChart from '@/components/DynamicChart.vue';

export default {
  name: 'ChartsView',
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
        const counter = [
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

          counter.forEach((ageGroup) => {
            if (Number(age) >= ageGroup.min && Number(age) <= ageGroup.max) {
              ageGroup.count += 1;
            }
          });
        });

        counter.forEach((ageGroup) => {
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
