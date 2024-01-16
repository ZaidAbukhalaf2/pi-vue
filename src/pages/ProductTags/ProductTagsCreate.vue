<template>
  <form @submit.prevent="submit">
    <div class="ma-3 col-4 mb-3">
      <label for="name">Tag </label>
      <select
        name="tag_id "
        id="tag_id"
        v-model="data.tag_id"
        class="form-select"
        aria-label="Default select example"
      >
        <option v-for="tag in tags.data" :key="tag.id" :value="tag.id">
          {{ tag.name }}
        </option>
      </select>
      <span class="error" v-if="errors">{{ errors.tag_id }}</span>
    </div>
    <div class="ma-3 col-4 mb-3">
      <label for="name">Product</label>
      <select
        name="product_id "
        id="product_id"
        v-model="data.product_id"
        class="form-select"
        aria-label="Default select example"
      >
        <option
          v-for="product in products.data"
          :key="product.id"
          :value="product.id"
        >
          {{ product.name }}
        </option>
      </select>
      <span class="error" v-if="errors">{{ errors.product_id }}</span>
    </div>
    <button class="btn btn-outline-primary">Save</button>
  </form>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  setup() {
    const data = reactive({
      product_id: "",
      tag_id: "",
    });

    const products = ref([]);
    const tags = ref([]);
    const errors = ref();
    const router = useRouter();

    // store new data
    const submit = async () => {
      await axios
        .post("admin/product-tag/store", data)
        .then((res) => {
          if (res.status == 200) {
            router.push("/product-tag/list");
          }
        })
        .catch((error) => {
          //handle error validation
          console.log(error.response.data.errors);
          if (error.response.status === 422) {
            return (errors.value = error.response.data.errors);
          }
        });
    };

    // return list data use in select option
    const allTags = () => {
      axios.get("admin/tags/all-tags").then((res) => {
        tags.value = res.data.tags;
      });
    };

    // return list data use in select option
    const allProducts = () => {
      axios.get("/admin/products/all-products").then((res) => {
        products.value = res.data.products;
      });
    };
    onMounted(allProducts);
    onMounted(allTags);
    return {
      tags,
      allTags,
      data,
      submit,
      allProducts,
      products,
      errors,
    };
  },
};
</script>

<style>
.error {
  color: red;
}
</style>
