<template>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <router-link
      class="btn btn-sm btn-outline-secondary"
      to="/product-tag/create"
      >Add</router-link
    >
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Product Name</th>
          <th scope="col">Tag Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tag in tags.data" :key="tag.id">
          <td>{{ tag.id }}</td>
          <td>{{ tag.product.name }}</td>
          <td>{{ tag.tag.name }}</td>
          <td>
            <div class="btn-group mr-2">
              <button @click="deleteProductTag(tag.id)" class="btn btn-danger">
                Delete
              </button>
              <router-link
                :to="`/product-tag/update/${tag.id}`"
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
    @customEvent="allTags($event)"
  ></paginator-bar>
</template>
<script>
import PaginatorBar from "@/components/PaginatorBar.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
export default {
  components:{PaginatorBar},

  setup() {
    const tags = ref([]);
    const productName = ref([]);
    const tagName = ref([]);
    const last_page = ref();

    // return list data 
    const allTags = (page = 1) => {
      axios.get(`admin/product-tag/all/?page=${page}`).then((res) => {
        tags.value = res.data.productTags;
        last_page.value = tags.value.last_page;

      });
    };

    // delete record
    const deleteProductTag = (id) => {
      if (confirm("Are you sure you want to delete?")) {
        axios.delete(`admin/product-tag/delete/${id}`).then((res) => {
          alert(res.data.message);
          allTags();
        });
      }
    };

    onMounted(allTags);

    return {
      tags,
      allTags,
      deleteProductTag,
      productName,
      tagName,
      last_page
    };
  },
};
</script>
