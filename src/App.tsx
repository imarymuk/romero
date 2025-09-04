import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { SystemNote } from "./blocks/system-note";
import { DELAY_BETWEEN_BLOCKS, INITIAL_BAROMETER_READING, PARENT_ANIMATION } from "./constants";
import { HorizontalBar } from "./blocks/horizontal-bar";
import { Barometer } from "./blocks/barometer";
import { SystemOptions } from "./blocks/system-options";
import { blocks } from "./blocks";
import { SequentialCustomerMessagesWrapper } from "./blocks/customer-message";
import { useLocalStorage } from "@uidotdev/usehooks";
import { AppContext, defaultAppContextValue } from "./context/app.context";
import { setStoryLineVariable } from "./storylineAPI";

function App() {
  const [ blocksTrail, setBlocksTrail ] = useLocalStorage<any[]>('block-trail', []);
  const [ selectedOptions, setSelectedOptions ] = useLocalStorage('selected-options', {});
  const [ visibleBlockIndex, setVisibleBlockIndex ] = useState(0);
  const [ barometerReading, setBarometerReading ] = useState(INITIAL_BAROMETER_READING);
  const [ isConversationStarted, setIsConversationStarted ] = useState(false);
  const [ defaultContextValue, setDefaultContextValue ] = useState(defaultAppContextValue);

  const appendNextNodes = (nextNodes) => {
    setBlocksTrail((prev) => [...prev, ...nextNodes]);
  };

  const handleBlockComplete = (block?: any, selectedOption?:any) => {
    setVisibleBlockIndex((prev) => prev + 1);

    if(block && block.type === "system-options" && selectedOption) {
      // Store the selected option for this block
      const newSelectedOptions = { ...selectedOptions };
      newSelectedOptions[block.id] = selectedOption;
      setSelectedOptions(newSelectedOptions);
    }
  };

  const initializeChat = () => {
    setBlocksTrail([...blocks.init]);
  }

  const handleResetButton = () => {
    initializeChat();
    setSelectedOptions({});
    setVisibleBlockIndex(0);
    setBarometerReading(INITIAL_BAROMETER_READING);
    setIsConversationStarted(true);
  }

  const handleContinueButton = () => {
    appendNextNodes([]);
    setIsConversationStarted(true);
    // Reset the context to initial state
    setBarometerReading(INITIAL_BAROMETER_READING);
    setVisibleBlockIndex(0);
    // Reset the context animations
    setDefaultContextValue({
      ...defaultContextValue,
      PARENT_ANIMATION: {
        animate: {
          transition: {
            staggerChildren: 0,
            delayChildren: 0,
          },
        },
      },
      FADE_IN_ANIMATION: {
        initial: { opacity: 1, y: 0 },
        animate: {
          opacity: 1,
          y: 0,
        },
      },
      DELAY_BETWEEN_BLOCKS: 0,
    });

    setTimeout(() => {
      setDefaultContextValue({
        ...defaultContextValue,
        PARENT_ANIMATION: PARENT_ANIMATION,
        FADE_IN_ANIMATION: defaultAppContextValue.FADE_IN_ANIMATION,
        DELAY_BETWEEN_BLOCKS: DELAY_BETWEEN_BLOCKS,
      });
    }, 1500);
  }

  const handleLastBlock = () => {
    // send variable to storyline
    console.log("Setting storyline variable Mrs_cap_Completed to true");
    setStoryLineVariable('Romero_completed', true);
  }

  useEffect(() => {
    console.log("Initializing chat...", blocksTrail);
    if(blocksTrail.length <= 0) {
      setBlocksTrail([...blocks.init]);
      setIsConversationStarted(true)
    }
  }, []);


  useEffect(() => {
    const lastBlock: any = blocksTrail[blocksTrail.length - 1];
    if (lastBlock && lastBlock.type === "reference") {
      appendNextNodes(blocks[lastBlock.nextNode] || []);
    }
  }, [blocksTrail]);

  useEffect(() => {
    if (visibleBlockIndex < blocksTrail.length) {
      const currentBlock = blocksTrail[visibleBlockIndex];
      
      // Auto-advance for certain block types after a delay
      if (currentBlock && (
        currentBlock.type === "horizontal-bar" || 
        currentBlock.type === "system-note" ||
        currentBlock.type === "barometer" ||
        currentBlock.type === "reference"
      )) {
        const timer = setTimeout(() => {
          handleBlockComplete(currentBlock);
        }, defaultContextValue.DELAY_BETWEEN_BLOCKS);

        return () => clearTimeout(timer);
      }
    }
  }, [visibleBlockIndex, blocksTrail]);

  if(blocksTrail.length > 1 && !isConversationStarted) {
    // show reset option
    return (<AppContext.Provider value={{data: defaultContextValue, updateContext: setDefaultContextValue}} >
      <div className="App">
        <div className="chat-container">
          <div className="flex gap-10">
            <button className="btn btn-tertiary" onClick={handleResetButton}>
              Reset conversation
            </button>
            <button className="btn btn-tertiary" onClick={handleContinueButton}>
              Continue conversation
            </button>
          </div>
        </div>
      </div>
    </AppContext.Provider>)
  }

  return (
    <AppContext.Provider value={{data: defaultContextValue, updateContext: setDefaultContextValue}} >
      <div className="App">
        <motion.div
          variants={defaultContextValue.PARENT_ANIMATION}
          initial="initial"
          animate="animate"
          className="chat-container"
        >
          {blocksTrail.slice(0, visibleBlockIndex + 1).map((block : any, index) => {
            if(block.last) {
              handleLastBlock();
            }

            if (block.type == "horizontal-bar") {
              return <HorizontalBar index={index} key={"horizontal-bar-" + index} className={index == 0 ? '!mt-0' : ''} />;
            }

            if (block.type == "system-note") {
              return (
                <SystemNote
                  key={"system-note" + index}
                  index={index}
                  message={block.message}
                />
              );
            }

            if (block.type == "barometer") {
              return (
                <Barometer
                  block={block}
                  index={index}
                  initialReading={barometerReading}
                  setBarometerReading={setBarometerReading}
                  key={"barometer" + index}
                />
              );
            }

            if (block.type == "system-options") {
              return (
                <SystemOptions
                  block={block}
                  index={index}
                  blocks={blocks}
                  appendNextNodes={appendNextNodes}
                  onComplete={handleBlockComplete}
                  key={"system-options-" + index}
                />
              );
            }

            if (block.type == "customer-message") {
              return (
                <SequentialCustomerMessagesWrapper
                  className="chat-bubble customer"
                  index={index}
                  messages={block.messages || []}
                  onComplete={handleBlockComplete}
                  key={"customer-message-sequential-" + index}
                />
              );
            }

            return <div key={index}></div>;
          })}
        </motion.div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
