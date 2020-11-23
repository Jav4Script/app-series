<template>
  <div>
    <div v-if="series.length" class="is-flex is-flex-wrap-wrap">
      <div class="custom-card-container" v-for="serie in series" :key="serie.id" :value="serie.id">
        <div class="card m-3 custom-card">
          <header class="card-header custom-card-header">
            <b-image responsive :src="serie.Poster" :alt="serie.Title" :web="serie.Poster" />
          </header>

          <div class="has-text-centered">
            <p class="custom-content">
              <strong>{{ serie.Title }}</strong>
            </p>

            <p class="custom-content">
              {{ formatSeasons(serie.Year) }}
            </p>

            <b-taglist attached class="custom-content is-justify-content-center">
              <b-tag class="custom-tag" type="is-info">IMDb ID</b-tag>
              <b-tag class="custom-tag" type="is-dark">{{ serie.imdbID }}</b-tag>
            </b-taglist>
          </div>

          <footer class="card-footer">
            <a class="card-footer-item custom-card-footer-seen">Já vi</a>
            <a class="card-footer-item custom-card-footer-see">Quero ver</a>
          </footer>
        </div>
      </div>
    </div>

    <div v-else class="box has-text-centered empty-box">
      <div class="section"><p>Nenhuma série.</p></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SeriesContent',
  computed: {
    ...mapState('series', ['series']),
  },
  methods: {
    formatSeasons(seasons) {
      if (seasons.length < 6) return seasons.slice(0, 4);
      return seasons;
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-card {
  background-color: #ecececd7;
}

.custom-card-footer-see {
  color: white;
  background-color: #48c774;
}

.custom-card-footer-seen {
  color: white;
  background-color: #f14668;
}

.custom-card-footer-see:hover,
.custom-card-footer-seen:hover {
  color: black;
}

.custom-content {
  margin: 1rem !important;
}

.custom-card-container {
  max-width: 25%;
}

.custom-card-header {
  padding: 2rem;
}
</style>
