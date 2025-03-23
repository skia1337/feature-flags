<template>
  <div class="p-8 flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h1 class="text-xl mb-4">Assigning variant...</h1>
      <p>Please wait, you will be redirected automatically.</p>
    </div>
  </div>
</template>

<script setup>
// this page only for error handling and redirect
// based on https://nuxt.com/blog/nuxt-on-the-edge
await useFetch("/api/decide");
navigateTo("/");
</script>
