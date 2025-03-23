<template>
  <div class="p-8">
    <h1 class="text-2xl">Redirecting to funnel...</h1>
  </div>
</template>

<script setup>
const router = useRouter();

onMounted(() => {
  router.push("/");
});
</script>
