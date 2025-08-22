import React, { use, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HorizontalBar } from "./horizontal-bar";
import { ScrollIntoView } from "../components/scroll-into-view";
import { AppContext } from "../context/app.context";
import { useLocalStorage } from "@uidotdev/usehooks";

interface SystemOption {
  label: string;
  nextNode: number;
}

export function SystemOptions({
  block,
  index,
  blocks,
  appendNextNodes,
  onComplete,
}) {
  const [selectedOption, setSelectedOption] =
    useState<SystemOption | null>(null);
  const [ selectedOptions, _ ] = useLocalStorage('selected-options', {});
  const context = useContext(AppContext);

  useEffect(() => {
    if (selectedOption) {
      if (onComplete) {
        onComplete(block, selectedOption);
      }
    }
  }, [selectedOption]);

  useEffect(() => {
    // check if the block has a selected option
    if(selectedOptions[block.id]) {
      setSelectedOption(selectedOptions[block.id]);
    }
  }, []);

  return (
    <ScrollIntoView>
      <div className="w-full">
        <motion.div
          variants={context?.data.FADE_IN_ANIMATION}
          className="flex flex-col gap-4 mt-8"
        >
          {selectedOption == null && (
            <>
              {block.options.map((option, jIndex) => (
                <button
                  onClick={() => {
                    setSelectedOption(option);
                    appendNextNodes(blocks[option.nextNode]);
                  }}
                  key={"system-options-option" + jIndex}
                  className={`btn btn-${block.variant ?? "secondary"} mx-auto`}
                >
                  {option.label}
                </button>
              ))}
            </>
          )}
        </motion.div>
        <AnimatePresence>
          {selectedOption && (
            <>
              {block.variant && block.variant == "primary" ? (
                <>
                  <HorizontalBar index={index} />
                  <motion.div
                    variants={context?.data.FADE_IN_ANIMATION}
                    className="option-selected"
                  >
                    <p className="text-center max-w-lg text-lg mx-auto">
                      {selectedOption.label}
                    </p>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  variants={context?.data.FADE_IN_ANIMATION}
                  className="agent-container"
                >
                  <div className="chat-bubble agent">
                    {selectedOption.label}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </ScrollIntoView>
  );
}
