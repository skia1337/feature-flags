<template>
  <component
    :is="components[screen.component]"
    v-bind="screen.props"
    @next="goNext"
  />
</template>

<script setup lang="ts">
import MultiChoiceQuestion from "~/components/MultiChoiceQuestion.vue";
import SingleChoiceQuestion from "~/components/SingleChoiceQuestion.vue";

const components = {
  MultiChoiceQuestion,
  SingleChoiceQuestion,
};

const { getScreen, getNextStep } = useFunnel();
const screen = getScreen("gender");
const router = useRouter();
const goNext = () => router.push(`/s/${getNextStep("gender")}`);
</script>
