<template>
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#"
        >Company name</a
      >
      <div class="navbar-nav">
        <div class="nav-item text-nowrap d-flex">
          <a class="nav-link px-3 text-decoration-none" @click="logout"
            >Sign out</a
          >
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import axios from "axios";
  import { useRouter } from "vue-router";
  
  export default {
    setup() {
      const router = useRouter();
      const logout = async () => {
        await axios.post("admin/logout");
        router.push("login");
      };
      return {
        logout,
      };
    },
  };
  </script>
  