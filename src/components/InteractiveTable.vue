<template>
  <div class="interactive-table-wrap overflow-x-auto">
    <table class="interactive-table w-full">
      <thead class="sticky">
        <th>Name</th>
        <th>Age</th>
        <th>Gender</th>
        <th>Eye Color</th>
        <th>Preferred Pet</th>
        <th>Preferred Fruit</th>
      </thead>
      <tbody>
        <template v-for="(person, index) in people">
          <tr v-if="showTableRow(person)" :key="index">
            <td>
              <input
                :value="person.name"
                type="text"
                class="input input--name"
                @input="onInputChange($event, index, 'name')"
                @keydown.enter="onKeyDownEnter"
              />
            </td>
            <td>
              <input
                :value="person.age"
                type="number"
                min="0"
                max="999"
                class="input input--age"
                @input="onInputChange($event, index, 'age')"
                @keydown.enter="onKeyDownEnter"
              />
            </td>
            <td>
              <input
                :value="person.gender"
                type="text"
                class="input input--gender"
                @input="onInputChange($event, index, 'gender')"
                @keydown.enter="onKeyDownEnter"
              />
            </td>
            <td>
              <input
                :value="person.eyeColor"
                type="text"
                class="input input--eye-color"
                @input="onInputChange($event, index, 'eyeColor')"
                @keydown.enter="onKeyDownEnter"
              />
            </td>
            <td>
              <input
                :value="person.preferences.pet"
                type="text"
                class="input input--pet"
                @input="onInputChange($event, index, 'preferences.pet')"
                @keydown.enter="onKeyDownEnter"
              />
            </td>
            <td>
              <input
                :value="person.preferences.fruit"
                type="text"
                class="input input--fruit"
                @input="onInputChange($event, index, 'preferences.fruit')"
                @keydown.enter="onKeyDownEnter"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'InteractiveTable',
  props: {
    searchString: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters(['people']),
  },
  methods: {
    ...mapActions(['setPersonValue']),
    onInputChange(e, index, key) {
      const { value } = e.target;
      this.setPersonValue({ index, key, value });
    },
    onKeyDownEnter() {
      this.blurInput();
    },
    /**
     * Remove focus from the active element.
     */
    blurInput() {
      document.activeElement.blur();
    },
    /**
     * Show table row if the searchString prop matches any
     * substring of one of its cell's values.
     * @param {object} person An object from the 'people' array
     * in the state in store.
     * @return {boolean} Whether the row should be visible.
     */
    showTableRow(person) {
      if (!this.searchString) return true;
      const search = this.searchString.toLowerCase();
      const {
        name,
        gender,
        eyeColor,
        age,
        preferences: { fruit, pet },
      } = person;
      return [name, gender, eyeColor, age, fruit, pet].some((value) =>
        String(value).toLowerCase().includes(search)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
th,
td {
  @apply px-2 py-1 text-left text-xs;

  @media screen and (min-width: 980px) {
    @apply text-base;
  }
}

tr {
  &:nth-child(even) {
    @apply bg-gray-200;
  }
  &:hover,
  &:focus-within {
    @apply bg-accent-light;
  }
}

.input {
  @apply px-2 py-1;
  background-color: initial;
  cursor: pointer;
  width: 90px;
  white-space: nowrap;
  text-overflow: ellipsis;

  &--age {
    width: 70px;
  }

  &--fruit {
    width: 110px;
  }

  &--name {
    width: 150px;
  }

  &:focus {
    @apply bg-white;
    cursor: text;
  }
}
</style>
