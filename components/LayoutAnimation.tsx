"use client";
import React from "react";
import { motion } from "framer-motion";

interface LayoutAnimationProps {
  children: React.ReactNode;
  className?: string;
}

const LayoutAnimation = ({ children, className }: LayoutAnimationProps) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={className}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default LayoutAnimation;
