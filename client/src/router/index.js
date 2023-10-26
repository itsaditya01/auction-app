import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";
import PurchaseView from "../views/PurchaseView.vue";
import AuctionListView from "../views/AuctionListView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      { path: "/auctions", component: AuctionListView },
      {
        path: "/purchases",
        component: PurchaseView,
      },
    ],
  },
  {
    path: "/auth",
    component: AuthView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/AboutView.vue");
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
