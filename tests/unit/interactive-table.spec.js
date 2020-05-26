import { shallowMount, createLocalVue } from '@vue/test-utils';
import InteractiveTable from '@/components/InteractiveTable.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('InteractiveTable.vue', () => {
  let wrapper, store, getters;

  beforeEach(() => {
    getters = {
      people: () => [
        {
          name: 'Example name',
          age: '20',
          gender: 'male',
          eyeColor: 'blue',
          preferences: {
            pet: 'cat',
            fruit: 'banana',
          },
        },
        {
          name: 'Different Example name',
          age: '22',
          gender: 'male',
          eyeColor: 'blue',
          preferences: {
            pet: 'dog',
            fruit: 'apple',
          },
        },
        {
          name: 'Another Example name',
          age: '44',
          gender: 'male',
          eyeColor: 'green',
          preferences: {
            pet: 'cat',
            fruit: 'mango',
          },
        },
      ],
    };
    store = new Vuex.Store({
      getters,
    });
    wrapper = shallowMount(InteractiveTable, { store, localVue, propsData: { searchString: '' } });
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a table', () => {
    expect(wrapper.find('table').exists()).toBe(true);
  });

  it('outputs people data in table', () => {
    expect(wrapper.find('tbody tr:first-child .input--name').element.value).toBe(
      getters.people()[0].name
    );
  });

  it('filters people data in table using searchString', async (done) => {
    wrapper = shallowMount(InteractiveTable, { store, localVue, propsData: { searchString: '' } });
    wrapper.setProps({ searchString: 'Different Example name' });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('tbody tr').length).toBe(1);
    expect(wrapper.find('tbody tr:first-child .input--name').element.value).toBe(
      'Different Example name'
    );
    done();
  });
});
