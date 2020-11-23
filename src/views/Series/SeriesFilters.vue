<template>
  <div class="panel custom-panel">
    <div class="panel-block" @keyup.enter.prevent="fetchSeries()">
      <b-field grouped class="field-grouped-container is-flex-touch is-flex-direction-column">
        <b-field expanded label="Nome">
          <b-input v-model="filters.name" placeholder="Nome" />
        </b-field>

        <b-field label="Ano de Lançamento">
          <b-input
            v-model="filters.released"
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
          <b-input v-model="filters.imdbId" placeholder="IMDb válido" />
        </b-field>

        <b-field class="is-flex is-align-items-flex-end">
          <b-button class="mr-2" type="is-primary" @click.stop.prevent="fetchSeries()">
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
  data() {
    const filters = {
      imdbId: '',
      name: '',
      page: 1,
      released: '',
    };
    const loading = {
      clean: false,
      filter: false,
    };

    return {
      filters,
      loading,
    };
  },
  methods: {
    ...mapActions('series', ['filterSeries']),
    allowedKeys(event) {
      if (event.charCode >= 48 && event.charCode <= 57) {
        return true;
      }
      return event.preventDefault();
    },
    async cleanFilters() {
      Object.keys(this.filters).forEach(key => {
        this.filters[key] = '';
      });

      this.loading.clean = true;
      await this.filterSeries(this.filters);
      this.loading.clean = false;
    },
    async fetchSeries() {
      this.loading.filter = true;
      await this.filterSeries(this.filters);
      this.loading.filter = false;
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
