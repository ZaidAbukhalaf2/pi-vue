<template>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <router-link class="btn btn-sm btn-outline-secondary" to="/product/create"
      >Add</router-link
    >
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Name</th>
          <th scope="col">description</th>
          <th scope="col">price</th>
          <th scope="col">category</th>
          <th scope="col">image_id</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products.data" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td v-if="product.category">{{ product.category.name }}</td>
          <td v-else>null</td>
          <td><img :src="product.image_id" width="50" alt="" /></td>
          <td>
            <div class="btn-group mr-2">
              <button @click="deleteProduct(product.id)" class="btn btn-danger">
                Delete
              </button>
              <router-link
                :to="`/product/update/${product.id}`"
                class="btn btn-outline-secondary ms-2"
                >Update</router-link
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <paginator-bar
    :lastPage="last_page"
    @customEvent="allProducts($event)"
  ></paginator-bar>
</template>
<script>
import PaginatorBar from "@/components/PaginatorBar.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
export default {
  components: { PaginatorBar },
  setup() {
    const products = ref([]);
    const last_page = ref();

    // return list data
    const allProducts = (page = 1) => {
      axios.get(`admin/products/all-products/?page=${page}`).then((res) => {
        products.value = res.data.products;
        last_page.value = products.value.last_page;
      });
    };

    // delete record
    const deleteProduct = (id) => {
      if (confirm("Are you sure you want to delete?")) {
        axios.delete(`admin/products/delete/${id}`).then((res) => {
          alert(res.data.message);
          allProducts();
        });
      }
    };

    onMounted(allProducts);

    return {
      products,
      allProducts,
      deleteProduct,
      last_page,
    };
  },
};
</script>
<style scoped>
.product-item {
  cursor: grab;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 5px;
}
</style>
