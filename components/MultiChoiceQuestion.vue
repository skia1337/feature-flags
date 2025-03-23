<template>
  <div class="p-8">
    <h2 :class="['text-2xl mb-4', title.classes]">
      {{ title.text }}
    </h2>
    <div v-for="opt in options" :key="opt.value" class="mb-2">
      <label>
        <input type="checkbox" :value="opt.value" v-model="localValue" />
        {{ opt.title }}
      </label>
    </div>
    <p v-if="showError" class="text-red-500 mt-2">
      Please select at least one option
    </p>
    <button
      @click="handleNext"
      class="mt-4 bg-black text-white px-4 py-2"
      :disabled="!localValue?.length"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string[] | null;
  title: {
    text: string;
    classes?: string;
  };
  options: {
    title: string;
    value: string;
  }[];
}

const props = defineProps<Props>();
const emit = defineEmits(["next", "update:modelValue"]);

const showError = ref(false);
const localValue = computed({
  get: () => props.modelValue || [],
  set: (value) => {
    showError.value = false;
    emit("update:modelValue", value);
  },
});

const handleNext = () => {
  if (!localValue.value?.length) {
    showError.value = true;
    return;
  }
  emit("next");
};
</script>
