<template>
  <div class="content-component">
    <div v-if="series.length" class="is-flex is-flex-wrap-wrap">
      <div class="custom-card-container" v-for="serie in series" :key="serie.id" :value="serie.id">
        <div class="card m-3 custom-card">
          <header
            v-if="serie.image && serie.image !== 'N/A'"
            class="card-header custom-card-header"
          >
            <b-image responsive :src="serie.image" :alt="serie.name" :web="serie.image" />
          </header>

          <div class="has-text-centered">
            <div v-if="displayFullCard" class="icons-container">
              <b-icon
                v-if="serie.seen"
                class="custom-eye-off-icon"
                icon="check"
                type="is-info"
              ></b-icon>

              <b-icon
                v-if="serie.see"
                class="custom-eye-icon"
                icon="eye"
                type="is-success"
              ></b-icon>
            </div>

            <p class="m-3">
              <strong>{{ serie.name }}</strong>
            </p>

            <p class="mb-3">
              {{ serie.year ? formatSeasons(serie.year) : '' }}
            </p>

            <div class="mb-5">
              <b-collapse
                aria-id="contentIdForA11y1"
                class="is-justify-content-center mb-3"
                ref="details"
                :open="false"
              >
                <a
                  aria-controls="contentIdForA11y1"
                  slot="trigger"
                  @click.prevent="checkPlot(serie.imdbId, serie.synopsis)"
                  >Detalhes</a
                >
                <div class="notification custom-notification">
                  <div v-if="!loading.series" class="content">
                    <div v-if="serie.seasons && serie.seasons !== 'N/A'" class="mb-3">
                      <span>{{
                        `${serie.seasons} ${serie.seasons > 1 ? 'temporadas' : 'temporada'}`
                      }}</span>
                    </div>

                    <div
                      v-if="
                        (serie.category || serie.released) &&
                          (serie.category !== 'N/A' || serie.released !== 'N/A')
                      "
                      class="mb-3 category-container"
                    >
                      <span>{{ `${serie.category} (${serie.released})` }}</span>
                    </div>

                    <div
                      v-if="serie.imdbRating && serie.imdbRating !== 'N/A'"
                      class="mb-3 imdb-rating"
                    >
                      <b-icon
                        class="mr-1 custom-icon-imdb-rating"
                        icon="star"
                        type="is-warning"
                      ></b-icon>
                      <strong>{{ serie.imdbRating }}</strong>
                    </div>

                    <b-taglist attached class="mb-4 is-justify-content-center">
                      <b-tag class="custom-tag" type="is-info">IMDb ID</b-tag>
                      <b-tag class="custom-tag" type="is-dark">{{ serie.imdbId }}</b-tag>
                    </b-taglist>

                    <div v-if="serie.synopsis && serie.synopsis !== 'N/A'" class="mb-1">
                      <b-button
                        outlined
                        type="is-dark"
                        @click.prevent="[(synopsisText = serie.synopsis), (openSynopsis = true)]"
                        >Ver Sinopse</b-button
                      >
                    </div>
                  </div>
                </div>
              </b-collapse>
            </div>
          </div>

          <footer class="card-footer" :class="{ 'decrease-font-size': displayFullCard }">
            <a
              class="card-footer-item custom-card-footer-seen"
              @click.prevent.stop="updateAndToast({ ...serie, seen: !serie.seen, see: serie.see })"
              >Já vi</a
            >

            <a
              class="card-footer-item has-text-centered custom-card-footer-see"
              @click.prevent.stop="updateAndToast({ ...serie, see: !serie.see, seen: serie.seen })"
              >Quero ver</a
            >

            <a
              v-if="displayFullCard"
              class="card-footer-item has-text-centered custom-card-footer-delete"
              :class="{ ' is-loading': loading.delete }"
              @click.prevent.stop="deleteAndToast({ mySerieId: serie.id })"
              >Excluir</a
            >
          </footer>
        </div>
      </div>
    </div>

    <div v-else class="box has-text-centered empty-box">
      <div class="section">
        <b-icon icon="emoticon-outline"></b-icon>
        <p>Nenhuma série.</p>
      </div>
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
  props: {
    series: { type: Array, default: () => [] },
    displayFullCard: { type: Boolean, default: false },
  },
  data() {
    return {
      openSynopsis: false,
      synopsisText: '',
    };
  },
  computed: {
    ...mapState('series', ['loading']),
  },
  methods: {
    ...mapActions('series', ['deleteMySerie', 'fetchSerieById', 'updateMySeries']),
    checkPlot(imdbId, plot) {
      if (!plot) this.getSerieById(imdbId);
    },
    async deleteAndToast(data) {
      try {
        await this.deleteMySerie(data);
        this.$buefy.toast.open({
          duration: 1500,
          message: 'Minha série excluída',
          position: 'is-bottom',
          type: 'is-success',
          queue: false,
        });
      } catch (error) {
        this.$buefy.toast.open({
          duration: 1500,
          message: 'Erro ao excluir minha série',
          position: 'is-bottom',
          type: 'is-danger',
          queue: false,
        });
      }
    },
    formatSeasons(seasons) {
      if (seasons.length < 6) return seasons.slice(0, 4);
      return seasons;
    },
    async getSerieById(imdbId, plot) {
      if (plot) return;
      await this.fetchSerieById(imdbId);
    },
    async updateAndToast(data) {
      try {
        await this.updateMySeries(data);
        this.$buefy.toast.open({
          duration: 1500,
          message: 'Minha série atualizada',
          position: 'is-bottom',
          type: 'is-success',
          queue: false,
        });
      } catch (error) {
        this.$buefy.toast.open({
          duration: 1500,
          message: 'Erro ao atualizar minha série',
          position: 'is-bottom',
          type: 'is-danger',
          queue: false,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content-component {
  margin-top: 0.5rem;
}

.custom-card {
  background-color: #ecececd7;
}

.custom-card-footer-delete {
  background-color: #f14668;
  color: white;
}

.custom-card-footer-see {
  background-color: #48c774;
  color: white;
}

.custom-card-footer-seen {
  background-color: #167df0;
  color: white;
}

.custom-card-footer-see:hover,
.custom-card-footer-seen:hover,
.custom-card-footer-delete:hover {
  color: black;
}

.custom-content {
  margin: 1rem !important;
}

.custom-card-container {
  max-width: 20%;
}

.custom-card-header {
  margin-top: 1rem;
  padding: 2rem;
}

.custom-eye-icon,
.custom-eye-off-icon {
  margin: 1rem 1rem 0.5rem;
}

.custom-icon-imdb-rating {
  vertical-align: bottom;
}

.custom-notification {
  font-size: 0.92rem;
  margin-top: 1rem;
}

.decrease-font-size {
  font-size: 0.92rem;
}

@media (min-width: 300px) and (max-width: 492px) {
  .custom-card-container {
    max-width: 100%;
  }
}

@media (min-width: 493px) and (max-width: 768px) {
  .custom-card-container {
    max-width: 50%;
  }
}

@media (min-width: 769px) and (max-width: 1023px) {
  .custom-card-container {
    max-width: 33%;
  }
}
</style>
