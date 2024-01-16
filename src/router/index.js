import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/login", component: () => import("../pages/LoginAdmin.vue") },
  {
    path: "",
    component: () => import("../pages/WrapperDashboard.vue"),
    children: [
      {
        path: "/category/list",
        name: "categoryList",
        component: () => import("../pages/Category/CategoryList.vue"),
      },
      {
        path: "/category/create",
        name: "categoryCreate",
        component: () => import("../pages/Category/CategoryCreate.vue"),
      },
      {
        path: "/category/update/:id",
        component: () => import("../pages/Category/CategoryUpdate.vue"),
      },
      {
        path: "/tag/list",
        name: "tagList",
        component: () => import("../pages/Tags/TagsList.vue"),
      },
      {
        path: "/tag/create",
        name: "tagCreate",
        component: () => import("../pages/Tags/TagsCreate.vue"),
      },
      {
        path: "/tag/update/:id",
        component: () => import("../pages/Tags/TagsUpdate.vue"),
      },
      {
        path: "/product-tag/list",
        name: "product-tag",
        component: () => import("../pages/ProductTags/ProductTagsList.vue"),
      },
      {
        path: "/product-tag/create",
        name: "product-tag-create",
        component: () => import("../pages/ProductTags/ProductTagsCreate.vue"),
      },
      {
        path: "/product-tag/update/:id",
        component: () => import("../pages/ProductTags/ProductTagsUpdate.vue"),
      },
      {
        path: "/product/list",
        name: "product",
        component: () => import("../pages/Product/ProductList.vue"),
      },
      {
        path: "/product/create",
        name: "product-create",
        component: () => import("../pages/Product/ProductCreate.vue"),
      },
      {
        path: "/product/update/:id",
        component: () => import("../pages/Product/ProductUpdate.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
