<template>
  <nav
    id="sidebarMenu"
    class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
  >
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link
            to="/product/list"
            active-class="active"
            class="nav-link"
          >
            Products
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/product-tag/list"
            active-class="active"
            class="nav-link"
          >
            Product Tags
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/tag/list" active-class="active" class="nav-link">
            Tags
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/category/list"
            active-class="active"
            class="nav-link"
          >
            Category
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
