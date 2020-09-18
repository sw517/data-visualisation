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
      <transition-group tag="tbody" name="list-swap">
        <tr v-for="(person, index) in cPeople" :key="person.name">
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
      </transition-group>
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
    cPeople() {
      /**
       * Show table row if the searchString prop matches any
       * substring of one of its cell's values.
       */
      let people = this.people;
      if (!this.searchString) return people;

      const search = this.searchString.toLowerCase();

      return people.reduce((acc, person) => {
        const {
          name,
          gender,
          eyeColor,
          age,
          preferences: { fruit, pet },
        } = person;

        const include = [name, gender, eyeColor, age, fruit, pet].some((value) =>
          String(value).toLowerCase().includes(search)
        );

        if (include) acc.push(person);
        return acc;
      }, []);
    },
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
  box-shadow: 0 -1px 0 0 theme('colors.accent-light');

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

.list-swap-enter-active,
.list-swap-leave-active {
  transition: all ease 0.4s;
}

.list-swap-enter,
.list-swap-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.list-swap-leave-active {
  position: absolute;
}

.list-swap-move {
  transition: transform 1s ease;
}
</style>
