import Vue from 'vue';
import Vuex from 'vuex';

import series from './modules/series';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    series,
  },
  strict: process.env.NODE_ENV !== 'production',
});
