<template>
  <div class="panel custom-panel">
    <div class="panel-block" @keyup.enter.prevent="checkFilters()">
      <b-field grouped class="field-grouped-container">
        <b-field expanded label="Nome">
          <b-input
            v-model="$parent[mySeriesRendered ? 'myFilters' : 'filters'].name"
            placeholder="Nome"
          />
        </b-field>

        <b-field label="Ano de Lançamento">
          <b-input
            v-model="$parent[mySeriesRendered ? 'myFilters' : 'filters'].released"
            placeholder="Ano de Lançamento"
            @keypress.native="allowedKeys($event)"
          />
        </b-field>

        <b-field>
          <template slot="label">
            IMDb ID
            <b-tooltip type="is-dark" label="Exemplo: tt1285016">
              <b-icon size="is-small" icon="help-circle-outline"></b-icon>
            </b-tooltip>
          </template>
          <b-input
            v-model="$parent[mySeriesRendered ? 'myFilters' : 'filters'].imdbId"
            placeholder="IMDb válido"
          />
        </b-field>

        <b-field class="is-flex is-align-items-flex-end buttons-container">
          <b-button class="mr-2" type="is-primary" @click.stop.prevent="checkFilters()">
            Filtrar
          </b-button>

          <b-button type="is-primary" @click.stop.prevent="cleanFilters()">
            Limpar
          </b-button>
        </b-field>
      </b-field>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SeriesFilters',
  props: {
    changePage: { type: Function, default: () => 0 },
    cleanFilters: { type: Function, default: () => {} },
    filters: { type: Object, default: () => {} },
    myFilters: { type: Object, default: () => {} },
    mySeriesRendered: { type: Boolean, default: false },
  },
  methods: {
    ...mapActions('series', ['filterMySeries', 'filterSeries']),
    allowedKeys(event) {
      if (event.charCode >= 48 && event.charCode <= 57) {
        return true;
      }
      return event.preventDefault();
    },
    checkFilters() {
      if (!this.filters.name && !this.filters.imdb) {
        this.$buefy.toast.open({
          duration: 3000,
          message: 'Insira nome ou IMDb ID',
          position: 'is-top',
          type: 'is-danger',
        });
        return;
      }
      this.changePage(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-panel {
  background-color: #ecececd7;
}

.field-grouped-container {
  width: 100%;
}

.field.is-grouped .field {
  flex-shrink: 1 !important;
}
</style>

<style>
@media (max-width: 768px) {
  .field-grouped-container > .field-body > .field.is-grouped {
    display: flex;
    flex-direction: column;
  }

  .field-grouped-container > .field-body > .field.is-grouped > .field {
    justify-content: center;
    margin: 0.5rem 0.5rem;
  }
}
</style>
