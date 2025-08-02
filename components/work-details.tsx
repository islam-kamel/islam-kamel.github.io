"use client";
import React, { PropsWithChildren, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { ScrollShadow } from "@heroui/scroll-shadow";

import Animate from "./animate";

function WorkDetails({
  details,
  company,
  children,
  className,
}: PropsWithChildren<{
  details: string | string[];
  company: string;
  className?: string;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={className} onClick={() => setIsOpen(true)}>
        {children}
      </button>
      <Modal
        backdrop="opaque"
        classNames={{
          body: "py-6",
          backdrop:
            "bg-[radial-gradient(125%_125%_at_50%_10%,transparent_40%,theme(colors.zinc.900)_100%)] backdrop-opacity-20 backdrop-blur-3xl",
          base: "border-primary/50 border bg-black/60 backdrop-blur text-foreground",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        isOpen={isOpen}
        radius="lg"
        scrollBehavior={"inside"}
        size={"lg"}
        onClose={() => setIsOpen(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {company}
              </ModalHeader>
              <ModalBody className="p-0">
                <ScrollShadow
                  className={"flex flex-1 flex-col gap-3  px-6  py-6"}
                >
                  {typeof details !== "string" ? (
                    details?.map((line, idx) => (
                      <Animate
                        key={idx}
                        as={"p"}
                        transition={{ delay: idx * 0.1 }}
                      >
                        {line}
                      </Animate>
                    ))
                  ) : (
                    <p>{details}</p>
                  )}
                </ScrollShadow>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant={"faded"} onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default WorkDetails;
