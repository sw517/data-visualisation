import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    people: [],
  },
  mutations: {
    SET_PEOPLE: (state, payload) => {
      Vue.set(state, 'people', payload);
    },
    SET_PERSON_VALUE: (state, { index, key, value }) => {
      /**
       * If key contains dot notation, split the key to
       * find the correct path to the object.
       */
      if (key.split('.').length > 1) {
        const splitKey = key.split('.');
        const parentKey = splitKey[0];
        const keyToSet = splitKey[splitKey.length - 1];
        Vue.set(state.people[index][parentKey], keyToSet, value);
      } else {
        Vue.set(state.people[index], key, value);
      }
    },
  },
  actions: {
    /**
     * Calls a mutation to set the 'people' array
     * in the store's state. This method should be
     * used to set the initial value.
     * @param {function} commit Requirement for calling mutation
     * @param {array} payload The data to set 'people' to.
     */
    setPeople: ({ commit }, payload) => {
      commit('SET_PEOPLE', payload);
    },
    /**
     * Calls a mutation to set an individual value for a
     * person in the 'people' array in the store's state.
     * @param {function} commit Requirement for calling mutation
     * @param {number||string} index The index of the person in 'people' array.
     * @param {string} key The key to change in the person object.
     * @param {number||string} value The value to change the key with.
     */
    setPersonValue: ({ commit }, { index, key, value }) => {
      if ((index || index === 0) && key) {
        commit('SET_PERSON_VALUE', { index, key, value });
      }
    },
  },
  getters: {
    people: (state) => state.people,
  },
  modules: {},
});
