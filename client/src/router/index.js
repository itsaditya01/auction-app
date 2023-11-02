import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";
import PurchaseView from "../views/PurchaseView.vue";
import AuctionListView from "../views/AuctionListView.vue";
import AddAuctionView from "../views/AddAuctionView.vue";
import AuctionView from "../views/AuctionView.vue";
import MyAuctionView from "../views/MyAuctionView.vue";

const routes = [
  { path: "/home", redirect: "/auctions" },
  {
    path: "/home",
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
        path: "/my-auctions",
        name: "my-auctions",
        component: MyAuctionView,
      },
    ],
  },

  {
    path: "/",
    component: AuthView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(function (to, _, next) {
  if (to.path === "/" && $cookies.get("token")) {
    next("/home");
  } else {
    next();
  }
});

export default router;
