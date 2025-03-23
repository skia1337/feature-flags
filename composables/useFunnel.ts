import { funnelConfigs, type FunnelVariant } from "~/utils/funnelConfigs";

interface Screen {
  id: string;
  component: string;
  props: Record<string, any>;
}

export const useFunnel = () => {
  const variant = useCookie("funnel_variant").value as FunnelVariant;
  const config = funnelConfigs[variant];

  if (!config) {
    return navigateTo("/error");
  }

  // prob can do some error handling in scheme here typeguards, etc
  const getFlow = () => config;
  const getScreen = (id: string) =>
    config.screens.find((s: Screen) => s.id === id);
  const getNextStep = (id: string) => {
    const index = config.screens.findIndex((s: Screen) => s.id === id);
    return config.screens[index + 1]?.id || "";
  };

  return {
    variant,
    config,
    getFlow,
    getScreen,
    getNextStep,
  };
};
