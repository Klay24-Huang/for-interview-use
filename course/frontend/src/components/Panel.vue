<script setup>
const foo = "123";
</script>

<template>
  <div class="flex mx-8">
    <!-- course info list -->
    <div class="w-1/2">
      <div class="text-2xl">Course Information</div>
      <div>{{ foo }}</div>
      <!-- course info block -->
      <div></div>
    </div>
    <!-- course controller -->
    <div class="w-1/2">
      <div class="text-2xl text-orange-400">Course I Plan To Take</div>
    </div>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
