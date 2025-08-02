"use client";
import React, { useId } from "react";
import { AnimatePresence, motion, MotionProps } from "framer-motion";

interface LayoutAnimationProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

const LayoutAnimation = ({
  children,
  className,
  ...props
}: LayoutAnimationProps) => {
  const id = useId();

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        className={className}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default LayoutAnimation;
