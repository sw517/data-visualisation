import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    people: {},
  },
  mutations: {
    SET_PEOPLE: (state, payload) => {
      Object.assign(state.people, payload);
    },
  },
  actions: {
    setPeople: ({ commit }, payload) => {
      commit('SET_PEOPLE', payload);
    },
  },
  getters: {
    people: (state) => state.people,
  },
  modules: {},
});
