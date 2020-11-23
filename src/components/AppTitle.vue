<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container custom-hero-container">
        <b-icon class="header-icon" icon="television" size="is-large" />

        <div>
          <h1 class="title">
            App Series
          </h1>
          <h2 class="subtitle">
            Your best friend
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppTitle',
};
</script>

<style lang="scss" scoped>
.custom-hero-container {
  display: inline-flex;
  margin-left: 80px;
}

.header-icon {
  margin-right: 0.5rem;
}
</style>
