<template>
  <div>
    <!-- <section>
      <div class="series-container">
        <Series-Highlights />
      </div>
    </section> -->

    <div class="container is-fullhd">
      <section>
        <div class="filters-container">
          <Series-Filters />
        </div>
      </section>

      <section>
        <div class="content-container">
          <Series-Content />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import SeriesContent from './SeriesContent';
import SeriesFilters from './SeriesFilters';
import SeriesHighlights from './SeriesHighlights.vue';

export default {
  name: 'SeriesWrapper',
  components: {
    SeriesContent,
    SeriesFilters,
    // SeriesHighlights,
  },
};
</script>

<style lang="scss" scoped>
.filters-container {
  margin: 2rem;
}

.content-container {
  margin: 2rem;
}
</style>
