<template>
  <div class="panel custom-panel">
    <div class="panel-block" @keyup.enter.prevent="checkFilters()">
      <b-field grouped class="field-grouped-container">
        <b-field expanded label="Nome">
          <b-input
            placeholder="Nome"
            :disabled="Boolean(filterImdb)"
            :value="filterName"
            @input="value => $emit(`${mySeriesRendered ? 'myFilters' : 'filters'}Name`, value)"
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
            placeholder="IMDb válido"
            :disabled="Boolean(filterName)"
            :value="filterImdb"
            @input="value => $emit(`${mySeriesRendered ? 'myFilters' : 'filters'}ImdbId`, value)"
          />
        </b-field>

        <b-field label="Ano de Lançamento">
          <b-input
            placeholder="Ano de Lançamento"
            maxlength="4"
            :has-counter="false"
            :value="filterReleased"
            @input="value => $emit(`${mySeriesRendered ? 'myFilters' : 'filters'}Released`, value)"
            @keypress.native="allowedKeys($event)"
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
  computed: {
    filterName() {
      return this.mySeriesRendered ? this.myFilters.name : this.filters.name;
    },
    filterReleased() {
      return this.mySeriesRendered ? this.myFilters.released : this.filters.released;
    },
    filterImdb() {
      return this.mySeriesRendered ? this.myFilters.imdbId : this.filters.imdbId;
    },
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
      if (!this.filterName && !this.filterImdb) {
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
