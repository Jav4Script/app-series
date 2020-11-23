<template>
  <footer class="footer custom-footer">
    <div class="is-flex is-justify-content-center">
      <b-icon class="footer-icon has-text-white" icon="television" />

      <p class="has-text-white">
        <strong class="has-text-white">App Series</strong> by Anderson Barros
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style lang="scss" scoped>
.custom-footer {
  background-color: #7957d5;
}

.footer-icon {
  margin-right: 0.5rem;
}
</style>
