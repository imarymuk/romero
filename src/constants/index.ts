export const STAGGER_CHILDREN = 1;
export const DELAY_BETWEEN_BLOCKS = 1000;
export const INITIAL_BAROMETER_READING = 50;

export const FADE_IN_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
  },
} as const;

export const PARENT_ANIMATION = {
  animate: {
    transition: {
      staggerChildren: STAGGER_CHILDREN,
      delayChildren: 0.5,
    },
  },
} as const;