<template>
  <div class="synopsis-component">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h3 class="title has-text-white">Sinopse</h3>
          <div class="box custom-box-container">
            <p class="synopsis-box">
              {{ synopsis }}
            </p>

            <b-button type="is-dark" @click.stop.prevent="closeModal()">
              Fechar
            </b-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AppSynopsis',
  props: {
    synopsis: { type: String, default: '' },
  },
  methods: {
    closeModal() {
      this.$parent.onCancel();
      this.$parent.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.synopsis-box {
  margin-bottom: 1rem;
}
</style>
