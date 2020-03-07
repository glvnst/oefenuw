<template>
  <div id="aboutMain" class="columns is-multiline is-mobile is-centered">
    <div class="column is-full">
      <div class="content">
        <h1>{{ $t("about_our_games") }}</h1>
      </div>
    </div>

    <div v-for="(route, i) in gameRoutes" :key="i" class="column">
      <div class="content">
        <h2>
          <router-link :to="route.path" class="link"
            >&#127918; {{ route.name }}</router-link
          >
        </h2>
        <p>
          {{ $t("description_" + route.path.substring(1)) }}
        </p>
      </div>
    </div>

    <div class="column is-full">
      <div class="box has-background-white-ter has-text-grey-darker">
        <div class="content">
          <h3>{{ $t("about_title") }}</h3>
          <p>{{ $t("about_description") }}</p>
          <p v-html="$t('about_oss', { repo: repoLink($t('about_repo')) })"></p>
          <!-- <p>
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          >
            <img
              alt="Creative Commons License"
              style="border-width:0"
              src="/by-nc-sa-40-88x31.png"
            />
          </a>
          <br />
          The images used in this work are licensed under a
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            >Creative Commons Attribution-NonCommercial-ShareAlike 4.0
            International License</a
          >.
        </p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  computed: {
    gameRoutes() {
      return this.$router.options.routes.filter(route => {
        return route.path != "/";
      });
    }
  },
  methods: {
    repoLink(repoLiteral) {
      return (
        '<a href="https://github.com/glvnst/oefenuw/" target="_blank">' +
        repoLiteral +
        "</a>"
      );
    }
  }
};
</script>

<style>
#aboutMain {
  margin: 1.5em 3em 0 3em;
}
</style>
