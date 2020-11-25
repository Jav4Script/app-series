<template>
  <div class="series-wrapper-container">
    <b-loading is-full-page :active="triggerLoading" can-cancel></b-loading>

    <div class="container is-fullhd flex-direction-column">
      <section>
        <div class="filters-container">
          <Series-Filters
            :change-page="changePage"
            :clean-filters="cleanFilters"
            :filters.sync="filters"
            :my-filters.sync="myFilters"
            :my-series-rendered="mySeriesRendered"
          />
        </div>
      </section>

      <section>
        <div class="content-container">
          <b-tabs v-model="tabItem" position="is-centered" type="is-toggle-rounded">
            <b-tab-item label="Séries" icon="television-box">
              <Series-Content ref="content" :series="series" />
            </b-tab-item>

            <b-tab-item label="Minhas Séries" icon="youtube-tv">
              <Series-Content ref="content" :series="mySeries" :display-full-card="true" />
            </b-tab-item>
          </b-tabs>
        </div>
      </section>

      <section>
        <div class="pagination-container">
          <App-Pagination
            :page="mySeriesRendered ? myFilters.page : filters.page"
            :count="mySeriesRendered ? count.mySeries : count.series"
            @change-page="page => changePage(page)"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import AppPagination from '@/components/AppPagination';

import SeriesContent from './SeriesContent';
import SeriesFilters from './SeriesFilters';

export default {
  name: 'SeriesWrapper',
  components: {
    AppPagination,
    SeriesContent,
    SeriesFilters,
  },
  data() {
    const filters = {
      imdbId: '',
      name: '',
      page: 1,
      released: '',
    };
    const myFilters = {
      imdbId: '',
      name: '',
      page: 1,
      released: '',
    };

    return {
      filters,
      myFilters,
      tabItem: 0,
    };
  },
  computed: {
    ...mapState('series', ['count', 'loading', 'series', 'mySeries']),
    mySeriesRendered() {
      return this.tabItem === 1;
    },
    triggerLoading() {
      return this.loading.series || this.loading.mySeries;
    },
  },
  methods: {
    ...mapActions('series', ['filterMySeries', 'filterSeries', 'firstCharge']),
    async changePage(page) {
      this[this.mySeriesRendered ? 'myFilters' : 'filters'].page = page;
      this.closeToggle();

      if (this.mySeriesRendered) {
        await this.filterMySeries(this.myFilters);
      } else {
        await this.filterSeries(this.filters);
      }
      this.setStorageFilters();
    },
    closeToggle() {
      const childrenRefs = Object.keys(this.$refs.content.$refs);
      if (childrenRefs.length) {
        this.$refs.content.$refs.details.forEach(component => {
          if (component.isOpen) component.toggle();
        });
      }
    },
    async cleanFilters() {
      Object.keys(this[this.mySeriesRendered ? 'myFilters' : 'filters']).forEach(key => {
        if (key !== 'page') {
          this[this.mySeriesRendered ? 'myFilters' : 'filters'][key] = '';
        }
      });

      if (this.mySeriesRendered) {
        this.filterMySeries(this.myFilters);
      }
    },
    loadStorageFilters() {
      const filterSeries = JSON.parse(localStorage.getItem('filterSeries'));
      if (filterSeries) {
        filterSeries.page = Number(filterSeries.page);
        this.filters = filterSeries;
      }

      const filterMyseries = JSON.parse(localStorage.getItem('filterMySeries'));
      if (filterMyseries) {
        filterMySeries.page = Number(filterMySeries.page);
        this.myFilters = filterMyseries;
      }
    },
    setStorageFilters() {
      const parsed = JSON.stringify(this.mySeriesRendered ? this.myFilters : this.filters);
      localStorage.setItem(`${this.mySeriesRendered ? 'filterMySeries' : 'filterSeries'}`, parsed);
    },
  },
  async created() {
    await this.firstCharge();
    if (!this.mySeries.length) {
      this.filterMySeries(this.myFilters);
    }

    this.loadStorageFilters();
  },
};
</script>

<style lang="scss" scoped>
.content-container {
  margin: 2rem 2rem 1rem 2rem;
}

.filters-container {
  margin: 2rem;
}

.pagination-container {
  margin: 0 2rem;
  margin-bottom: 2rem;
}
</style>
