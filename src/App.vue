<template>
  <div id="app">
    <div id="nav" class="shadow-lg sticky top-0 mb-6 bg-white">
      <router-link to="/">Charts</router-link> |
      <router-link to="/data">Data</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
// Helpers
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  created() {
    axios.get('/people.json').then((response) => {
      this.setPeople(response.data);
    });
  },
  methods: {
    ...mapActions(['setPeople']),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.btn {
  @apply py-2 px-4 rounded bg-accent text-white;
}

.container {
  @apply p-4 mx-auto;
}

.row {
  @apply flex flex-wrap -mx-4 justify-center;
}

.column {
  @apply px-4 mb-6;
}
</style>
