<template>
  <form @submit.prevent="submit">
    <div class="ma-3 col-4 mb-3 mt-3">
      <label for="name">Name</label>
      <input v-model="data.name" class="form-control" type="text" name="name" />
      <span class="error" v-if="errors">{{ errors }}</span>
    </div>
    <button class="btn btn-outline-primary">Save</button>
  </form>
</template>

<script>
import { reactive, onMounted, ref } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const data = reactive({
      name: "",
    });
    const errors = ref();
    const router = useRouter();
    const route = useRoute();

    // show Old data
    onMounted(async () => {
      const response = await axios.get(
        `admin/categories/show/${route.params.id}`
      );
      data.name = response.data.category.name;
    });

    // update data
    const submit = async () => {
      await axios
        .post(`admin/categories/update/${route.params.id}`, data)
        .then((res) => {
          if (res.status == 200) {
            router.push("/category/list");
          }
        })
        .catch((error) => {
          //handle error validation
          if (error.response.status === 422) {
            return (errors.value = error.response.data.errors.name[0]);
          }
        });
    };

    return {
      data,
      submit,
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
