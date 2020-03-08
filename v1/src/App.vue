<template>
  <div id="app">
    <nav
      class="navbar is-success"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a
          id="logotype"
          class="navbar-item is-size-4 is-size-6-mobile"
          href="/"
        >
          oefen uw nederlands
        </a>

        <a
          role="button"
          :class="{ 'navbar-burger': true, 'is-active': mobileMenu }"
          aria-label="menu"
          aria-expanded="false"
          @click="mobileMenu = !mobileMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div :class="{ 'navbar-menu': true, 'is-active': mobileMenu }">
        <div class="navbar-start">
          <router-link
            v-for="(route, i) in $router.options.routes"
            :key="i"
            :to="route.path"
            @click.native="mobileMenu = false"
            class="navbar-item is-tab"
            exact
          >
            {{ route.name }}
          </router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item has-text-centered">
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
  name: "App",
  data() {
    return {
      mobileMenu: false
    };
  },
  components: {
    LanguageChooser
  }
};
</script>

<style lang="scss">
// $modal-content-width: 900px;
@import "~bulma";

html {
  background: linear-gradient(
      0deg,
      rgb(244, 255, 255) 0%,
      rgb(159, 231, 255) 100%
    )
    no-repeat center center fixed;
  background-size: cover;
}

body {
  overflow: hidden;
}

#app {
  font-family: "Saira", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#logotype {
  // "Bungee Inline", "Fredericka the Great", "Monoton", "Quicksand", "Saira", "Rubik Mono One",
  font-family: "Rubik Mono One", Helvetica, sans-serif;
}

nav {
  font-family: "Saira", Helvetica, sans-serif;
  font-size: 1.15em;
}

// /* baloo-regular - latin-ext_latin */
// @font-face {
//   font-family: "Baloo";
//   font-style: normal;
//   font-weight: 400;
//   src: local("Baloo Regular"), local("Baloo-Regular"),
//     url("/fonts/baloo-v5-latin-ext_latin-regular.woff2") format("woff2"),
//     url("/fonts/baloo-v5-latin-ext_latin-regular.woff") format("woff");
// }

// /* black-han-sans-regular - latin */
// @font-face {
//   font-family: "Black Han Sans";
//   font-style: normal;
//   font-weight: 400;
//   src: local("Black Han Sans Regular"), local("BlackHanSans-Regular"),
//     url("/fonts/black-han-sans-v8-latin-regular.woff2") format("woff2"),
//     url("/fonts/black-han-sans-v8-latin-regular.woff") format("woff");
// }

// /* bungee-inline-regular - latin-ext_latin */
// @font-face {
//   font-family: "Bungee Inline";
//   font-style: normal;
//   font-weight: 400;
//   src: local("Bungee Inline"), local("BungeeInline-Regular"),
//     url("/fonts/bungee-inline-v5-latin-ext_latin-regular.woff2") format("woff2"),
//     url("/fonts/bungee-inline-v5-latin-ext_latin-regular.woff") format("woff");
// }

/* bungee-shade-regular - latin-ext_latin */
@font-face {
  font-family: "Bungee Shade";
  font-style: normal;
  font-weight: 400;
  src: local("Bungee Shade"), local("BungeeShade-Regular"),
    url("/fonts/bungee-shade-v5-latin-ext_latin-regular.woff2") format("woff2"),
    url("/fonts/bungee-shade-v5-latin-ext_latin-regular.woff") format("woff");
}

// /* fredericka-the-great-regular - latin-ext_latin */
// @font-face {
//   font-family: "Fredericka the Great";
//   font-style: normal;
//   font-weight: 400;
//   src: local("Fredericka the Great"), local("FrederickatheGreat"),
//     url("/fonts/fredericka-the-great-v9-latin-ext_latin-regular.woff2")
//       format("woff2"),
//     url("/fonts/fredericka-the-great-v9-latin-ext_latin-regular.woff")
//       format("woff");
// }

// /* holtwood-one-sc-regular - latin */
// @font-face {
//   font-family: "Holtwood One SC";
//   font-style: normal;
//   font-weight: 400;
//   src: local("Holtwood One SC"), local("HoltwoodOneSC"),
//     url("/fonts/holtwood-one-sc-v10-latin-regular.woff2") format("woff2"),
//     url("/fonts/holtwood-one-sc-v10-latin-regular.woff") format("woff");
// }

/* monoton-regular - latin */
@font-face {
  font-family: "Monoton";
  font-style: normal;
  font-weight: 400;
  src: local("Monoton"), local("Monoton-Regular"),
    url("/fonts/monoton-v9-latin-regular.woff2") format("woff2"),
    url("/fonts/monoton-v9-latin-regular.woff") format("woff");
}

// /* quicksand-regular - latin-ext_latin */
// @font-face {
//   font-family: "Quicksand";
//   font-style: normal;
//   font-weight: 400;
//   src: local(""),
//     url("/fonts/quicksand-v20-latin-ext_latin-regular.woff2") format("woff2"),
//     url("/fonts/quicksand-v20-latin-ext_latin-regular.woff") format("woff");
// }

// /* quicksand-700 - latin-ext_latin */
// @font-face {
//   font-family: "Quicksand";
//   font-style: normal;
//   font-weight: 700;
//   src: local(""),
//     url("/fonts/quicksand-v20-latin-ext_latin-700.woff2") format("woff2"),
//     url("/fonts/quicksand-v20-latin-ext_latin-700.woff") format("woff");
// }

// /* raleway-dots-regular - latin-ext_latin */
// @font-face {
//   font-family: "Raleway Dots";
//   font-style: normal;
//   font-weight: 400;
//   src: local("Raleway Dots"), local("RalewayDots-Regular"),
//     url("/fonts/raleway-dots-v7-latin-ext_latin-regular.woff2") format("woff2"),
//     url("/fonts/raleway-dots-v7-latin-ext_latin-regular.woff") format("woff");
// }

/* rubik-mono-one-regular - latin-ext_cyrillic_latin */
@font-face {
  font-family: "Rubik Mono One";
  font-style: normal;
  font-weight: 400;
  src: local("Rubik Mono One Regular"), local("RubikMonoOne-Regular"),
    url("/fonts/rubik-mono-one-v8-latin-ext_cyrillic_latin-regular.woff2")
      format("woff2"),
    url("/fonts/rubik-mono-one-v8-latin-ext_cyrillic_latin-regular.woff")
      format("woff");
}

/* saira-100 - latin-ext_latin */
@font-face {
  font-family: "Saira";
  font-style: normal;
  font-weight: 100;
  src: local("Saira Thin"), local("Saira-Thin"),
    url("/fonts/saira-v4-latin-ext_latin-100.woff2") format("woff2"),
    url("/fonts/saira-v4-latin-ext_latin-100.woff") format("woff");
}

/* saira-regular - latin-ext_latin */
@font-face {
  font-family: "Saira";
  font-style: normal;
  font-weight: 400;
  src: local("Saira Regular"), local("Saira-Regular"),
    url("/fonts/saira-v4-latin-ext_latin-regular.woff2") format("woff2"),
    url("/fonts/saira-v4-latin-ext_latin-regular.woff") format("woff");
}

/* saira-700 - latin-ext_latin */
@font-face {
  font-family: "Saira";
  font-style: normal;
  font-weight: 700;
  src: local("Saira Bold"), local("Saira-Bold"),
    url("/fonts/saira-v4-latin-ext_latin-700.woff2") format("woff2"),
    url("/fonts/saira-v4-latin-ext_latin-700.woff") format("woff");
}

/* saira-900 - latin-ext_latin */
@font-face {
  font-family: "Saira";
  font-style: normal;
  font-weight: 900;
  src: local("Saira Black"), local("Saira-Black"),
    url("/fonts/saira-v4-latin-ext_latin-900.woff2") format("woff2"),
    url("/fonts/saira-v4-latin-ext_latin-900.woff") format("woff");
}

// /* seymour-one-regular - latin-ext_latin */
// @font-face {
//   font-family: "Seymour One";
//   font-style: normal;
//   font-weight: 400;
//   src: local("Seymour One"), local("SeymourOne"),
//     url("/fonts/seymour-one-v7-latin-ext_latin-regular.woff2") format("woff2"),
//     url("/fonts/seymour-one-v7-latin-ext_latin-regular.woff") format("woff");
// }

// /* vt323-regular - latin-ext_latin */
// @font-face {
//   font-family: "VT323";
//   font-style: normal;
//   font-weight: 400;
//   src: url("/fonts/vt323-v11-latin-ext_latin-regular.eot"); /* IE9 Compat Modes */
//   src: local("VT323 Regular"), local("VT323-Regular"),
//     url("/fonts/vt323-v11-latin-ext_latin-regular.eot?#iefix")
//       format("embedded-opentype"),
//     /* IE6-IE8 */ url("/fonts/vt323-v11-latin-ext_latin-regular.woff2")
//       format("woff2"),
//     /* Super Modern Browsers */
//       url("/fonts/vt323-v11-latin-ext_latin-regular.woff") format("woff"),
//     /* Modern Browsers */ url("/fonts/vt323-v11-latin-ext_latin-regular.ttf")
//       format("truetype"),
//     /* Safari, Android, iOS */
//       url("/fonts/vt323-v11-latin-ext_latin-regular.svg#VT323") format("svg"); /* Legacy iOS */
// }
</style>
