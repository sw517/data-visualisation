import capitalize from 'lodash.capitalize';
import get from 'lodash.get';
import randomColor from '@/utils/randomColor';

export default {
  methods: {
    getDataset(key) {
      if (!Object.values(this.people).length) return null;
      const counter = {};
      const dataset = {};
      const bgColors = [];

      Object.values(this.people).forEach((person) => {
        let keyValue = get(person, key);
        keyValue = capitalize(keyValue);

        if (counter[keyValue]) {
          counter[keyValue] += 1;
        } else {
          counter[keyValue] = 1;
          bgColors.push(randomColor(keyValue));
        }
      });

      Object.assign(dataset, { labels: Object.keys(counter) });
      Object.assign(dataset, { data: Object.values(counter) });
      Object.assign(dataset, { backgroundColor: bgColors });

      return dataset;
    },
  },
};
