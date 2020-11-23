<template>
  <div class="series-wrapper-container">
    <b-loading is-full-page :active="triggerLoading" can-cancel></b-loading>

    <!-- <section>
      <div class="series-container">
        <Series-Highlights />
      </div>
    </section> -->

    <div class="container is-fullhd">
      <section>
        <div class="filters-container">
          <Series-Filters :filters.sync="filters" />
        </div>
      </section>

      <section>
        <div class="content-container">
          <Series-Content ref="content" />
        </div>
      </section>

      <section>
        <div class="pagination-container">
          <App-Pagination
            :page="filters.page"
            :count="count.series"
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
// import SeriesHighlights from './SeriesHighlights.vue';

export default {
  name: 'SeriesWrapper',
  components: {
    AppPagination,
    SeriesContent,
    SeriesFilters,
    // SeriesHighlights,
  },
  data() {
    const filters = {
      imdbId: '',
      name: '',
      page: 1,
      released: '',
    };

    return {
      filters,
    };
  },
  computed: {
    ...mapState('series', ['count', 'loading']),
    triggerLoading() {
      return this.loading.series || this.loading.mySeries;
    },
  },
  methods: {
    ...mapActions('series', ['filterSeries']),
    changePage(page) {
      this.filters.page = page;
      this.$refs.content.$refs.details.forEach(component => {
        if (component.isOpen) component.toggle();
      });
      this.filterSeries(this.filters);
    },
    async cleanFilters() {
      Object.keys(this.filters).forEach(key => {
        if (key !== 'page') {
          this.filters[key] = '';
        }
      });
    },
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
