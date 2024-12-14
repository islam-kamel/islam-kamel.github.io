"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

export const Example = () => {
  const [colors, setColors] = useState(initialColors);

  useEffect(() => {
    setTimeout(() => setColors(shuffle(colors)), 1000);
  }, [colors]);

  return (
    <div className={"flex gap-1"}>
      {colors.map((background) => (
        <motion.div
          key={background}
          layout
          className={"rounded-full"}
          style={{ width: 10, height: 10, background }}
          transition={spring}
        />
      ))}
    </div>
  );
};

const initialColors = ["#F34F29", "#F3B700", "#77878B"];

export default function ComingSoon() {
  return (
    <div>
      {/* Heading Animation */}
      <div className={"flex items-baseline gap-2 justify-center"}>
        <h1 className={"text-4xl font-bold "}>Coming Soon!</h1>
        <Example />
      </div>

      {/* Subheading Animation */}
      <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <span className={"text-muted"}>
          We&#39;re working hard to bring something amazing.
        </span>
      </motion.div>
    </div>
  );
}
