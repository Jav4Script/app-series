import api from './http';

const mountParams = filters => {
  let params = '?';
  if (filters) {
    if (filters.imdbId) {
      params += `imdbId=${filters.imdbId}&`;
    }
    if (filters.name) {
      params += `name=${filters.name}&`;
    }
    if (filters.page) {
      params += `page=${filters.page}&`;
    }
    if (filters.released) {
      params += `released=${filters.released}&`;
    }
  }

  return params;
};

export const deleteMySerie = mySerieId => api.delete(`/my-series/${mySerieId}`);

export const filterSeries = filters => {
  const params = mountParams(filters);
  return api.get(`/series${params}`);
};

export const filterMySeries = filters => {
  const params = mountParams(filters);
  return api.get(`/my-series${params}`);
};
export const fetchSerieById = imdbId => api.get(`/series/${imdbId}`);
export const updateMySeries = data => api.patch(`/my-series`, data);
