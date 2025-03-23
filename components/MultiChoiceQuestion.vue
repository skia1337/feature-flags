<template>
  <div class="p-8">
    <h2 :class="['text-2xl mb-4', title.classes]">
      {{ title.text }}
    </h2>
    <div v-for="opt in options" :key="opt.value" class="mb-2">
      <label>
        <input type="checkbox" :value="opt.value" /> {{ opt.title }}
      </label>
    </div>
    <button @click="$emit('next')" class="mt-4 bg-black text-white px-4 py-2">
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: {
    text: string;
    classes?: string;
  };
  options: {
    title: string;
    value: string;
  }[];
}

defineOptions({
  name: "MultiChoiceQuestion",
});

defineProps<Props>();
defineEmits(["next"]);
</script>
