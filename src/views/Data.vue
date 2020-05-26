<template>
  <div class="about">
    <div class="container">
      <div class="row">
        <div class="column w-full">
          <h1 class="mb-4 text-xl">People Data</h1>
          <input
            v-model="search"
            class="shadow-outline p-2 mb-8"
            type="text"
            placeholder="Search table"
          />
          <InteractiveTable :search-string="search" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InteractiveTable from '@/components/InteractiveTable';

export default {
  name: 'DataView',
  components: {
    InteractiveTable,
  },
  data() {
    return {
      search: '',
    };
  },
};
</script>
