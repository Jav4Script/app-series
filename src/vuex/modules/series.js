import { filterSeries, fetchMySeries } from '@/resources/series';

const types = {
  SERIES: 'SERIES',
  SERIES_MY: 'SERIES_MY',
};

const mutations = {
  [types.SERIES](state, data) {
    state.series = data;
  },
  [types.SERIES_MY](state, data) {
    if (data && Array.isArray(data)) {
      state.mySeries = data;
    } else if (data && typeof data === 'object') {
      const index = state.mySeries.findIndex(serie => serie.id === data.id);
      if (index > -1) {
        state.mySeries[index] = Object.assign(state.mySeries[index], data);
      }
      state.mySeries.push(data);
    }
  },
};

const actions = {
  async filterSeries({ commit }, filters = {}) {
    const { data: response } = await filterSeries(filters);
    if (response.status !== 200) return Promise.reject(response.data);
    return commit(types.SERIES, response.data);
  },
  async fetchMySeries({ commit }, filters = {}) {
    const { data: response } = await fetchMySeries(filters);
    if (response.status !== 200) return Promise.reject(response.data);
    return commit(types.SERIES, response.data);
  },
};

const state = {
  mySeries: [],
  series: [],
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
