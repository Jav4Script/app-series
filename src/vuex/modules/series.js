import Vue from 'vue';

import {
  deleteMySerie,
  filterSeries,
  filterMySeries,
  fetchSerieById,
  updateMySeries,
} from '@/resources/series';

const types = {
  SERIES: 'SERIES',
  SERIES_COUNT: 'SERIES_COUNT',
  SERIES_FIRST_CHARGE: 'SERIES_FIRST_CHARGE',
  SERIES_LOADING: 'SERIES_LOADING',
  SERIES_MY: 'SERIES_MY',
  SERIES_MY_COUNT: 'SERIES_MY_COUNT',
  SERIES_MY_DELETE: 'SERIES_MY_DELETE',
  SERIES_MY_FIRST_CHARGE: 'SERIES_MY_FIRST_CHARGE',
  SERIES_MY_LOADING: 'SERIES_MY_LOADING',
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

    const parsed = JSON.stringify(state.series);
    localStorage.setItem('series', parsed);
  },
  [types.SERIES_COUNT](state, count) {
    state.count.series = count;
    localStorage.setItem('seriesCount', state.count.series);
  },
  [types.SERIES_FIRST_CHARGE](state) {
    const series = JSON.parse(localStorage.getItem('series'));
    const seriesCount = Number(localStorage.getItem('seriesCount'));

    if (series) state.series = series;
    if (seriesCount) state.count.series = seriesCount;
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
        state.mySeries.unshift(data);
        const mySeriesCount = Number(localStorage.getItem('mySeriesCount')) + 1;
        localStorage.setItem('mySeriesCount', mySeriesCount);
      }
    }

    const parsed = JSON.stringify(state.mySeries);
    localStorage.setItem('mySeries', parsed);
  },
  [types.SERIES_MY_COUNT](state, count) {
    state.count.mySeries = count;
    localStorage.setItem('mySeriesCount', state.count.mySeries);
  },
  [types.SERIES_MY_DELETE](state, mySerieId) {
    const index = state.mySeries.findIndex(element => element.id === mySerieId);
    if (index > -1) state.mySeries.splice(index, 1);

    const parsed = JSON.stringify(state.mySeries);
    localStorage.setItem('mySeries', parsed);
    const mySeriesCount = Number(localStorage.getItem('mySeriesCount')) - 1;
    localStorage.setItem('mySeriesCount', mySeriesCount);
  },
  [types.SERIES_MY_FIRST_CHARGE](state) {
    const mySeries = JSON.parse(localStorage.getItem('mySeries'));
    const mySeriesCount = Number(localStorage.getItem('mySeriesCount'));

    if (mySeries) state.mySeries = mySeries;
    if (mySeriesCount) state.count.mySeries = mySeriesCount;
  },
  [types.SERIES_MY_LOADING](state, loading) {
    state.loading.mySeries = loading;
  },
};

const actions = {
  async deleteMySerie({ commit }, { mySerieId }) {
    commit(types.SERIES_MY_LOADING, true);
    const response = await deleteMySerie(mySerieId);
    if (response.status !== 200) return Promise.reject();
    commit(types.SERIES_MY_LOADING, false);
    return commit(types.SERIES_MY_DELETE, mySerieId);
  },
  firstCharge({ commit }) {
    commit(types.SERIES_FIRST_CHARGE);
    commit(types.SERIES_MY_FIRST_CHARGE);
  },
  async filterSeries({ commit }, filters = {}) {
    commit(types.SERIES_LOADING, true);
    const { data: response } = await filterSeries(filters);
    if (response.status !== 200) return Promise.reject(response.data);
    commit(types.SERIES_COUNT, response.count);
    commit(types.SERIES_LOADING, false);
    return commit(types.SERIES, response.data);
  },
  async filterMySeries({ commit }, filters = {}) {
    commit(types.SERIES_MY_LOADING, true);
    const response = await filterMySeries(filters);
    if (response.status !== 200) return Promise.reject(response.data.data);
    commit(types.SERIES_MY_COUNT, response.data.count);
    commit(types.SERIES_MY_LOADING, false);
    return commit(types.SERIES_MY, response.data.data);
  },
  async fetchSerieById({ commit }, imdbId) {
    commit(types.SERIES_LOADING, true);
    const { data: response } = await fetchSerieById(imdbId);
    if (response.status !== 200) return Promise.reject(response.data);
    commit(types.SERIES_LOADING, false);
    commit(types.SERIES, response.data);
    return response.data;
  },
  async updateMySeries({ commit }, data) {
    commit(types.SERIES_LOADING, true);
    const response = await updateMySeries(data);
    if (response.status !== 201) return Promise.reject(response);
    commit(types.SERIES_LOADING, false);
    return commit(types.SERIES_MY, response.data);
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
