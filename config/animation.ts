import { type MotionProps } from "framer-motion";

export const fadUp: MotionProps = {
  exit: { opacity: 0, y: -50 },
  initial: { opacity: 0, y: 50 },
  transition: { duration: 0.5 },
  viewport: { once: true, amount: 0.1 },
  whileInView: { opacity: 1, y: 0 },
};

export const fadLeft: MotionProps = {
  exit: { opacity: 0, x: -10 },
  initial: { opacity: 0, x: 10 },
  transition: { duration: 0.5 },
  viewport: { once: true, amount: 0.1 },
  whileInView: { opacity: 1, x: 0 },
};

export const fadRight: MotionProps = {
  exit: { opacity: 0, x: 10 },
  initial: { opacity: 0, x: -10 },
  transition: { duration: 0.5 },
  viewport: { once: true, amount: 0.1 },
  whileInView: { opacity: 1, x: 0 },
};

export const fadDown: MotionProps = {
  exit: { opacity: 0, y: 50 },
  initial: { opacity: 0, y: -50 },
  transition: { duration: 0.5 },
  viewport: { once: true, amount: 0.1 },
  whileInView: { opacity: 1, y: 0 },
};

export const faded: MotionProps = {
  exit: { opacity: 0 },
  initial: { opacity: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true, amount: 0.1 },
  whileInView: { opacity: 1 },
};
