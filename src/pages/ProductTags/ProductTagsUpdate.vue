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
      <label for="name">Product </label>
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
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const data = reactive({
      product_id: "",
      tag_id: "",
    });
    const router = useRouter();
    const route = useRoute();
    const tags = ref([]);
    const products = ref([]);

    // show Old data
    const show = ()=>{
        axios.get(`admin/product-tag/show/${route.params.id}`).then(res => {

          data.product_id = res.data.productTag.product_id
          data.tag_id = res.data.productTag.tag_id
        })
    };
    
    // update data
    const submit = async () => {
      await axios.post(`admin/product-tag/update/${route.params.id}`, data);
      await router.push("/product-tag/list");
    };

    // return list data use in select option
    const allTags = () => {
      axios.get("admin/tags/all-tags").then((res) => {
        tags.value = res.data.tags;
        console.log(tags.value);
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
    onMounted(show);
    
    return {
      tags,
      allTags,
      data,
      submit,
      allProducts,
      products,
      show
    };
  },
};
</script>
