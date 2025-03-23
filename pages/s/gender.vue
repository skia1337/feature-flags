<template>
  <component
    :is="components[screen.component]"
    v-bind="screen.props"
    @next="goNext"
    v-model="selectedValue"
  />
</template>

<script setup lang="ts">
import MultiChoiceQuestion from "~/components/MultiChoiceQuestion.vue";
import SingleChoiceQuestion from "~/components/SingleChoiceQuestion.vue";

const components = {
  MultiChoiceQuestion,
  SingleChoiceQuestion,
};

const { getScreen, getNextStep, variant } = useFunnel();
const screen = getScreen("gender");
const router = useRouter();
const selectedValue = ref(null);

const goNext = async () => {
  const runtimeConfig = useRuntimeConfig();

  await useFetch("/api/track", {
    method: "POST",
    body: {
      event: variant,
      properties: {
        $current_url: "gender",
        screen_id: "gender",
        answer: selectedValue.value,
        is_complete: true,
      },
    },
  });

  router.push(`/s/${getNextStep("gender")}`);
};
</script>
