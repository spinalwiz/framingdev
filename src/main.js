import Form from './form';
import Mouldings from './mouldings';

Vue.component('tabs', {
  template: `
  <div>
  <div class="tabs is-centered is-medium">
  <ul>
  <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
  <a :href='tab.href' @click="selectTab(tab)">{{tab.name}}</a>
  </li>
  </ul>
  </div>

  <div class="tabs-details">
  <slot></slot>
  </div>
  </div>
  `,

  data() {
    return {
      tabs: [],
    };
  },

  created() {
    this.tabs = this.$children;
  },

  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach((tab) => {
        tab.isActive = (tab.name === selectedTab.name);
      });
    },
  },
});

Vue.component('tab', {
  template: `
  <div v-show="isActive"><slot></slot></div>
  `,

  props: {
    name: { required: true },
    selected: { default: false },
  },

  data() {
    return {
      isActive: false,
    };
  },

  mounted() {
    this.isActive = this.selected;
  },

  computed: {
    href() {
      return `#${this.name.toLowerCase().replace(/ /g, '-')}`;
    },
  },
});

const app = new Vue({
  el: '#app',

  data: {
    form: new Form({
      frameType: '',
      mountColour: '',
    }),
    mouldings: [],
    colours: [],
    finishes: [],
    selectedColour: '',
    selectedFinish: '',
  },

  methods: {
    onSubmit() {
      this.form.submit('get', 'mouldings')
        .then((data) => {
          console.log(data);
          this.mouldings = data;
          this.colours = this.mouldings.map(moulding => moulding.colour);
          this.colours = [...new Set(this.colours)];
          this.finishes = this.mouldings.map(moulding => moulding.finish);
          this.finishes = [...new Set(this.finishes)];
          console.log(this.finishes);
        })
        .catch(error => console.log(error));
    },

    mouldingsFilter() {
      return this.mouldings.filter(moulding => moulding.colour === this.selectedColour);
    }
  }
})
