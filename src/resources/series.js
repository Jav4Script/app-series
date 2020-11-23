import api from './http';

export const filterSeries = filters => {
  let params = '?';
  if (filters) {
    if (filters.imdbId) {
      params += `imdbId=${filters.imdbId}`;
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

  return api.get(`/series${params}`);
};

export const fetchMySeries = () => api.get('/my-series');
