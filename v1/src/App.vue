<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <span class="is-size-4 has-text-success has-text-weight-semibold"
            >oefen uw nederlands</span
          >
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link
            v-for="(route, i) in $router.options.routes"
            :key="i"
            :to="route.path"
            class="navbar-item is-tab"
            exact
          >
            {{ route.name }}
          </router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <LanguageChooser></LanguageChooser>
          </div>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
import LanguageChooser from "@/components/LanguageChooser.vue";

export default {
  components: {
    LanguageChooser
  }
};
</script>

<style lang="scss">
// $modal-content-width: 900px;
@import "~bulma";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
