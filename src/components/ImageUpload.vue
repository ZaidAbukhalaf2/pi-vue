<template>
 <label class="btn btn-primary">
    upload <input type="file" hidden @change="upload($event.target.files)" />
  </label>
</template>


<script>

export default {
    setup() {

    }
}

</script>