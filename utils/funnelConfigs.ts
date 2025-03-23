export interface Option {
  title: string;
  value: string;
}

export interface Title {
  text: string;
  classes?: string;
}

export interface ScreenProps {
  title: Title;
  options?: Option[];
}

export type ComponentName =
  | "MultiChoiceQuestion"
  | "SingleChoiceQuestion"
  | "LandingV1"
  | "LandingV2";
export type ScreenId =
  | "index"
  | "gender"
  | "meat_preference"
  | "daily_water_intake";
export type FunnelVariant = "baseline" | "experiment";

export interface Screen<
  TId extends string = ScreenId,
  TComponent extends string = ComponentName
> {
  id: TId;
  component: TComponent;
  props: ScreenProps;
}

export interface FunnelConfig<
  TId extends string = ScreenId,
  TComponent extends string = ComponentName
> {
  screens: Screen<TId, TComponent>[];
}

const baseline: FunnelConfig = {
  screens: [
    {
      id: "index",
      component: "LandingV1",
      props: {
        title: {
          text: "Hello",
          classes: "text-emerald-400",
        },
      },
    },
    {
      id: "gender",
      component: "SingleChoiceQuestion",
      props: {
        title: {
          text: "What's your gender?",
          classes: "text-emerald-400",
        },
        options: [
          { title: "Female", value: "female" },
          { title: "Male", value: "male" },
        ],
      },
    },
    {
      id: "meat_preference",
      component: "MultiChoiceQuestion",
      props: {
        title: {
          text: "Which meat do you prefer?",
        },
        options: [
          { title: "Chicken", value: "chicken" },
          { title: "Pork", value: "pork" },
          { title: "Bacon", value: "bacon" },
          { title: "Beef", value: "beef" },
          { title: "Turkey", value: "turkey" },
          { title: "Fish", value: "fish" },
          { title: "Lamb", value: "lamb" },
        ],
      },
    },
    {
      id: "daily_water_intake",
      component: "SingleChoiceQuestion",
      props: {
        title: {
          text: "How many glasses of water do you drink per day?",
        },
        options: [
          { title: "I only have coffee or tea", value: "none" },
          { title: "Less than 2 glasses", value: "2_glasses" },
          { title: "About 3-6 glasses", value: "2_5_glasses" },
          { title: "More than 6 glasses", value: "5_glasses" },
        ],
      },
    },
  ],
};

const experiment: FunnelConfig = {
  screens: [
    {
      id: "index",
      component: "LandingV2",
      props: {
        title: {
          text: "Hello, this is experiment!",
          classes: "text-rose-500",
        },
      },
    },
    {
      id: "meat_preference",
      component: "MultiChoiceQuestion",
      props: {
        title: {
          text: "Which meat do you prefer?",
        },
        options: [
          { title: "Chicken", value: "chicken" },
          { title: "Pork", value: "pork" },
          { title: "Bacon", value: "bacon" },
          { title: "Beef", value: "beef" },
          { title: "Turkey", value: "turkey" },
          { title: "Fish", value: "fish" },
          { title: "Lamb", value: "lamb" },
        ],
      },
    },
    {
      id: "gender",
      component: "SingleChoiceQuestion",
      props: {
        title: {
          text: "What's your gender?",
          classes: "text-emerald-400",
        },
        options: [
          { title: "Female", value: "female" },
          { title: "Male", value: "male" },
        ],
      },
    },
    {
      id: "daily_water_intake",
      component: "SingleChoiceQuestion",
      props: {
        title: {
          text: "How many glasses of water do you drink per day?",
        },
        options: [
          { title: "I only have coffee or tea", value: "none" },
          { title: "Less than 2 glasses", value: "2_glasses" },
          { title: "About 3-6 glasses", value: "2_5_glasses" },
          { title: "More than 6 glasses", value: "5_glasses" },
        ],
      },
    },
  ],
};

export const funnelConfigs: Record<FunnelVariant, FunnelConfig> = {
  baseline,
  experiment,
};
