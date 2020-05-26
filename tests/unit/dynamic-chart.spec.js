import { shallowMount } from '@vue/test-utils';
import DynamicChart from '@/components/DynamicChart.vue';

describe('DynamicChart.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(DynamicChart, {
      methods: { setUpDatasets: () => {} },
      propsData: {
        labels: ['Red', 'Green', 'Blue'],
        datasets: [
          {
            label: 'Favourite Colours',
            data: [10, 22, 12],
          },
        ],
      },
    });
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a canvas', () => {
    expect(wrapper.find('canvas').exists()).toBe(true);
  });
});
