import Vue from "vue";
import VueRouter from "vue-router";
// import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Over",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "About" */ "../views/About.vue")
  },
  {
    path: "/alfabet",
    name: "Alfabet",
    component: () =>
      import(/* webpackChunkName: "Alfabet" */ "../views/Alfabet.vue")
  },
  {
    path: "/ditofdat",
    name: "Dit of Dat",
    component: () =>
      import(/* webpackChunkName: "DitOfDat" */ "../views/DitOfDat.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "is-active",
  routes
});

export default router;
