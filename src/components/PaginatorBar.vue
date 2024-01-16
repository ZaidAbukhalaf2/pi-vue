<template>
  <nav>
    <ul class="pagination">
      <li class="page-item me-2">
        <a class="link-page" href="javascript:void(0)" @click="previous"
          >Previous</a
        >
      </li>
      <li class="page-item">
        <a class="link-page" href="javascript:void(0)" @click="next">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: { lastPage: Number },

  setup(props, { emit }) {
    // const emit = defineEmits();
    const page = ref(1);

    watch(page, () => {
        emit('customEvent', page.value);
    });

    const next = () => {
      if (page.value < props.lastPage) {
        page.value++;
      }
    };

    const previous = () => {
      if (page.value > 1) {
        page.value--;
      }
    };

    return {
      page,
      next,
      previous,
    };
  },
};
</script>
