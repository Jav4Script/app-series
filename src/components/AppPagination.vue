<template>
  <div class="is-flex is-justify-content-flex-end">
    <b-field grouped>
      <div>
        <b-pagination
          rounded
          aria-next-label="Próxima Página"
          aria-previous-label="Página anterior"
          aria-page-label="Página"
          aria-current-label="Página atual"
          icon-prev="chevron-left"
          icon-next="chevron-right"
          order="is-right"
          range-after="2"
          range-before="2"
          :current="page"
          :total="count"
          @change="changePage"
        >
        </b-pagination>
      </div>
    </b-field>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    count: { type: Number },
    page: { type: Number },
  },
  methods: {
    changePage(page) {
      this.$emit('change-page', page);
    },
  },
};
</script>
