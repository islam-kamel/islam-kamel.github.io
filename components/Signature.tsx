"use client";
import { useEffect, useState } from "react";
import { Image, ImageProps } from "@nextui-org/image";
import { useTheme } from "next-themes";

export const Signature = (props: ImageProps) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <Image src={`logo-${theme?.toString()}.svg`} width={34} {...props} />;
};
