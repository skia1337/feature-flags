<template>
  <component
    :is="components[screen.component]"
    v-bind="screen.props"
    @next="goNext"
  />
</template>

<script setup lang="ts">
import LandingV1 from "~/components/LandingV1.vue";
import LandingV2 from "~/components/LandingV2.vue";

const components = {
  LandingV1,
  LandingV2,
};

const { getScreen, getNextStep } = useFunnel();
const screen = getScreen("index");
const router = useRouter();
const goNext = () => router.push(`/s/${getNextStep("index")}`);
</script>
