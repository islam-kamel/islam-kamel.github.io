import { tv } from "tailwind-variants";

export const title = tv({
  base: "inline font-semibold font-mono",
  variants: {
    color: {
      violet: "from-primitive-violet-from to-primitive-violet-to",
      yellow: "from-primitive-yellow-from to-primitive-yellow-to",
      blue: "from-primitive-blue-from to-primitive-blue-to",
      cyan: "from-primitive-cyan-from to-primitive-cyan-to",
      green: "from-primitive-green-from to-primitive-green-to",
      pink: "from-primitive-pink-from to-primitive-pink-to",
      foreground:
        "dark:from-primitive-foreground-from dark:to-primitive-foreground-to",
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full font-sans font-normal",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});
