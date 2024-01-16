<template>
    <nav-bar />
    <div class="container-fluid">
      <div class="row">
        <menu-nave />
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from "@/components/NavBar.vue";
  import MenuNave from "@/components/MenuNave";
  import axios from "axios";
  import { onMounted } from "vue";
  import { useRouter } from 'vue-router';
  export default {
    components: {
      NavBar,
      MenuNave,
    },
    setup() {
      const router = useRouter();
      onMounted(async () => {
        try {
          await axios.post("admin/user");
        } catch(e) {
          await router.push('login');
        }
      });
    },
  };
  </script>
  