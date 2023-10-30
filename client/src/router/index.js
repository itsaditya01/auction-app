import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";
import PurchaseView from "../views/PurchaseView.vue";
import AuctionListView from "../views/AuctionListView.vue";
import AddAuctionView from "../views/AddAuctionView.vue";
import AuctionView from "../views/AuctionView.vue";

const routes = [
  { path: "/", redirect: "/auctions" },
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "/auction/:id",
        name: "AuctionView",
        component: AuctionView,
      },
      { path: "/auctions", name: "AuctionList", component: AuctionListView },
      {
        path: "/purchases",
        component: PurchaseView,
      },
      {
        path: "/add-auction",
        component: AddAuctionView,
      },
      {
        path: "/about",
        name: "about",
        component: function () {
          return import("../views/AboutView.vue");
        },
      },
    ],
  },

  {
    path: "/auth",
    component: AuthView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
