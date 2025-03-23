<template>
  <div class="p-8">
    <h1 :class="['text-4xl mb-2', title.classes]">
      {{ title.text }}
    </h1>
    <button @click="$emit('next')" class="mt-4 bg-black text-white px-4 py-2">
      Start Survey
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: {
    text: string;
    classes?: string;
  };
}

defineProps<Props>();
defineEmits(["next"]);
</script>
