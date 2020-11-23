import Vue from 'vue';

import { filterSeries, fetchMySeries, fetchSerieById } from '@/resources/series';

const types = {
  SERIES: 'SERIES',
  SERIES_COUNT: 'SERIES_COUNT',
  SERIES_LOADING: 'SERIES_LOADING',
  SERIES_MY: 'SERIES_MY',
};

const mutations = {
  [types.SERIES](state, data) {
    if (data && Array.isArray(data)) {
      state.series = data;
    } else if (data && typeof data === 'object') {
      const index = state.series.findIndex(serie => serie.imdbID === data.imdbID);
      if (index > -1) {
        const newObject = Object.assign(state.series[index], data);
        Vue.set(state.series, index, newObject);
      } else {
        state.series.push(data);
      }
    }
  },
  [types.SERIES_COUNT](state, count) {
    state.count.series = count;
  },
  [types.SERIES_LOADING](state, loading) {
    state.loading.series = loading;
  },
  [types.SERIES_MY](state, data) {
    if (data && Array.isArray(data)) {
      state.mySeries = data;
    } else if (data && typeof data === 'object') {
      const index = state.mySeries.findIndex(serie => serie.id === data.id);
      if (index > -1) {
        const newObject = Object.assign(state.mySeries[index], data);
        Vue.set(state.mySeries, index, newObject);
      } else {
        state.mySeries.push(data);
      }
    }
  },
};

const actions = {
  async filterSeries({ commit }, filters = {}) {
    commit(types.SERIES_LOADING, true);
    const { data: response } = await filterSeries(filters);
    if (response.status !== 200) return Promise.reject(response.data);
    commit(types.SERIES_COUNT, response.count);
    commit(types.SERIES_LOADING, false);
    return commit(types.SERIES, response.data);
  },
  async fetchMySeries({ commit }, filters = {}) {
    const { data: response } = await fetchMySeries(filters);
    if (response.status !== 200) return Promise.reject(response.data);

    return commit(types.SERIES, response.data);
  },
  async fetchSerieById({ commit }, imdbId) {
    commit(types.SERIES_LOADING, true);
    const { data: response } = await fetchSerieById(imdbId);
    if (response.status !== 200) return Promise.reject(response.data);
    commit(types.SERIES_LOADING, false);
    return commit(types.SERIES, response.data);
  },
};

const state = {
  mySeries: [],
  series: [],
  count: {
    mySeries: 0,
    series: 0,
  },
  loading: {
    mySeries: false,
    series: false,
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
