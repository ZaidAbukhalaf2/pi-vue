<template>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <router-link class="btn btn-sm btn-outline-secondary" to="/category/create"
      >Add</router-link
    >
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories.data" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>
            <div class="btn-group mr-2">
              <button
                @click="deleteCategory(category.id)"
                class="btn btn-danger"
              >
                Delete
              </button>
              <router-link
                :to="`/category/update/${category.id}`"
                class="btn btn-outline-secondary ms-2"
                >Update</router-link
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <paginator-bar :lastPage="last_page" @customEvent="allCategories($event)"></paginator-bar>
</template>
<script>
import PaginatorBar from "@/components/PaginatorBar.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
export default {
  components:{PaginatorBar},
  setup() {
    const categories = ref([]);
    const last_page = ref();

    // return list data
    const allCategories = (page = 1) => {
      axios.get(`admin/categories/all-categories/?page=${page}`).then((res) => {
        categories.value = res.data.categories;
        last_page.value = categories.value.last_page;
      });
    };

    // delete record
    const deleteCategory = (id) => {
      if (confirm("Are you sure you want to delete?")) {
        axios.delete(`admin/categories/delete/${id}`).then((res) => {
          alert(res.data.message);
          allCategories();
        });
      }
    };

    onMounted(allCategories);

   
    return {
      categories,
      allCategories,
      deleteCategory,
      last_page,
    };
  },
};
</script>

<style>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.table,
th,
td {
  border: 1px solid #ddd;
}

th,
td {
  padding: 10px;
  text-align: left;
}

.pagination {
  display: flex;
  list-style: none;
}

.page-item {
  margin: 0 5px;
}

.page-link {
  cursor: pointer;
  color: #007bff;
}
</style>
