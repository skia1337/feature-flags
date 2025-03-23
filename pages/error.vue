<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Oops! Something went wrong
      </h1>
      <p class="text-gray-600 mb-8">
        You have been redirected to this page because the funnel variant is not
        valid.
      </p>
      <button
        @click="resetCookie"
        class="text-blue-500 hover:text-blue-700 underline"
      >
        Change your browser cookie
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
});

const router = useRouter();

const resetCookie = () => {
  const cookie = useCookie("funnel_variant");
  cookie.value = null;

  navigateTo("/decide");
};
</script>
