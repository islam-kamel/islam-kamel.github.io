"use client";
import React, { ReactHTML, useId } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

import { faded } from "@/config/animation";

type AnimateProps<T extends keyof ReactHTML> = {
  as?: keyof ReactHTML;
} & React.PropsWithChildren<HTMLMotionProps<T>>;

export function Animate<T extends keyof ReactHTML>({
  as = "div",
  children,
  ...props
}: AnimateProps<T>) {
  const id = useId();
  const MotionTag = (motion as any)[as] as React.ElementType;

  return (
    <AnimatePresence mode={"wait"}>
      <MotionTag id={id} {...faded} {...props}>
        {children}
      </MotionTag>
    </AnimatePresence>
  );
}

export default Animate;
