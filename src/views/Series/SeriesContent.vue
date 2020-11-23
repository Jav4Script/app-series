<template>
  <div>
    <div v-if="series.length" class="is-flex is-flex-wrap-wrap">
      <div class="custom-card-container" v-for="serie in series" :key="serie.id" :value="serie.id">
        <div class="card m-3 custom-card">
          <header class="card-header custom-card-header">
            <b-image responsive :src="serie.Poster" :alt="serie.Title" :web="serie.Poster" />
          </header>

          <div class="has-text-centered">
            <p class="m-3">
              <strong>{{ serie.Title }}</strong>
            </p>

            <p class="mb-3">
              {{ formatSeasons(serie.Year) }}
            </p>

            <div class="mb-3">
              <b-collapse
                aria-id="contentIdForA11y1"
                class="is-justify-content-center"
                ref="details"
                :open="false"
              >
                <a
                  aria-controls="contentIdForA11y1"
                  slot="trigger"
                  @click.prevent="getSerieById(serie.imdbID, serie.Plot)"
                  >Detalhes</a
                >
                <div class="notification custom-notification">
                  <div v-if="!loading.series" class="content">
                    <div class="mb-3">
                      <span>{{
                        `${serie.totalSeasons} ${
                          serie.totalSeasons > 1 ? 'temporadas' : 'temporada'
                        }`
                      }}</span>
                    </div>

                    <div class="mb-3 category-container">
                      <span>{{ `${serie.Genre} (${serie.Released})` }}</span>
                    </div>

                    <div class="mb-3 imdb-rating">
                      <b-icon
                        class="mr-1 custom-icon-imdb-rating"
                        icon="star"
                        type="is-warning"
                      ></b-icon>
                      <strong>{{ serie.imdbRating }}</strong>
                    </div>

                    <b-taglist attached class="mb-4 is-justify-content-center">
                      <b-tag class="custom-tag" type="is-info">IMDb ID</b-tag>
                      <b-tag class="custom-tag" type="is-dark">{{ serie.imdbID }}</b-tag>
                    </b-taglist>

                    <div class="mb-1">
                      <b-button
                        outlined
                        type="is-dark"
                        @click.prevent="[(synopsisText = serie.Plot), (openSynopsis = true)]"
                        >Ver Sinopse</b-button
                      >
                    </div>
                  </div>
                </div>
              </b-collapse>
            </div>
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

    <b-modal :active.sync="openSynopsis" has-modal-card>
      <App-Synopsis v-if="openSynopsis" :synopsis="synopsisText" />
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import AppSynopsis from '@/components/AppSynopsis';

export default {
  name: 'SeriesContent',
  components: {
    AppSynopsis,
  },
  data() {
    return {
      openSynopsis: false,
      synopsisText: '',
    };
  },
  computed: {
    ...mapState('series', ['series', 'loading']),
  },
  methods: {
    ...mapActions('series', ['fetchSerieById']),
    formatSeasons(seasons) {
      if (seasons.length < 6) return seasons.slice(0, 4);
      return seasons;
    },
    async getSerieById(imdbId, plot) {
      if (plot) return;
      await this.fetchSerieById(imdbId);
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
  max-width: 20%;
}

.custom-card-header {
  padding: 2rem;
}

.custom-icon-imdb-rating {
  vertical-align: bottom;
}

.custom-notification {
  font-size: 0.92rem;
  margin-top: 1rem;
}

.details-button {
  margin-bottom: 1rem;
}
</style>
