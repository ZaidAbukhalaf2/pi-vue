<template>
  <form @submit.prevent="submit" enctype="multipart/form-data">
    <div class="col-4 mt-3">
      <label for="name"> Name</label>
      <input v-model="data.name" class="form-control" type="text" name="name" />
      <span class="error" v-if="errors">{{ errors }}</span>
    </div>
    <div class="col-4">
      <textarea
        v-model="data.description"
        name="description"
        id="exampleFormControlTextarea1"
        rows="3"
        class="mt-4 mb-3 form-control"
        placeholder="description"
      ></textarea>
    </div>
    <div class="mb-3 col-4">
      <label for="price"> price</label>
      <input
        v-model.number="data.price"
        class="form-control"
        type="number"
        name="price"
      />
    </div>
    <div class="mb-3 col-4">
      <label for="image"> Image</label>
      <input class="form-control" type="file" @change="onFileSeleted" />
      <input hidden v-model="data.image_id" />
      <img :src="data.image_id" alt="image" width="50" />
    </div>

    <div class="col-4 mb-3">
      <label for="category"> category</label>
      <select
        name="category "
        id="category"
        v-model="data.category_id"
        class="form-select"
        aria-label="Default select example"
      >
        <option
          v-for="category in categories.data"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
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
      name: "",
      description: "",
      price: "",
      category_id: "",
      image_id: "",
    });

    const router = useRouter();
    const route = useRoute();
    const categories = ref([]);
    const errors = ref();
    const selectedImage = ref();

    //upload file
    function onFileSeleted(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          data.image_id = reader.result;
          selectedImage.value = file;
        };
        reader.readAsDataURL(file);
      }
    }
    //update data
    const submit = async () => {
      const formData = new FormData();
      formData.append("image_id", selectedImage.value);
      await axios
        .post(`admin/products/update/${route.params.id}`, data, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            router.push("/product/list");
          }
        })
        .catch((error) => {
          //handle error validation
          if (error.response.status === 422) {
            return (errors.value = error.response.data.errors.name[0]);
          }
        });
    };

    // return list data use in select option
    const allCategories = () => {
      axios.get("admin/categories/all-categories").then((res) => {
        categories.value = res.data.categories;
        console.log(categories.value);
      });
    };

    // show Old data
    onMounted(async () => {
      const response = await axios.get(
        `admin/products/show/${route.params.id}`
      );
      console.log(response.data);
      data.name = response.data.products.name;
      data.description = response.data.products.description;
      data.price = response.data.products.price;
      data.category_id = response.data.products.category_id;
      data.image_id = response.data.products.image_id;
    });

    onMounted(allCategories);
    return {
      data,
      submit,
      allCategories,
      categories,
      errors,
      selectedImage,
      onFileSeleted,
    };
  },
};
</script>

<style>
.error {
  color: red;
}
</style>
