<template>
  <div class="app-container">
    <App-Title />
    <main class="app-content">
      <router-view :key="$route.path" />
    </main>
    <App-Footer class="app-footer" />
  </div>
</template>

<script>
import AppTitle from '../components/AppTitle';
import AppFooter from '../components/app/AppFooter';

export default {
  name: 'Default',
  components: {
    AppTitle,
    AppFooter,
  },
};
</script>

<style lang="scss">
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app-content {
  flex: 1 0 auto;
}

.app-footer {
  flex-shrink: 0;
}
</style>
