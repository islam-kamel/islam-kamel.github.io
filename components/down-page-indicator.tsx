"use client";
import React from "react";
import { Icon } from "@iconify/react";

import { Animate } from "./animate";

function DownPageIndicator() {
  const onScroll = () => {
    const cv = document.getElementById("cv");

    if (cv) {
      cv.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={"absolute bottom-10"}>
      <button
        className={
          "bg-primary/40 hover:bg-primary/90 transition backdrop-blur-2xl py-4 px-1 rounded-full border-primary border"
        }
        onClick={onScroll}
      >
        <Animate
          animate={{ y: 5 }}
          initial={{ y: 0 }}
          transition={{
            duration: 1,
            delay: 0.1,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <Icon className={"text-2xl"} icon={"line-md:arrow-down"} />
        </Animate>
      </button>
    </div>
  );
}

export default DownPageIndicator;
