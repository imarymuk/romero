import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DELAY_BETWEEN_BLOCKS } from "../constants";
import { ScrollIntoView } from "../components/scroll-into-view";
import { AppContext } from "../context/app.context";

// Animated Chat Bubble Component for customer messages only
const AnimatedChatBubble = ({ message, className, shouldAnimate = false }) => {
  const [showTyping, setShowTyping] = useState(shouldAnimate);
  const [showMessage, setShowMessage] = useState(!shouldAnimate);

  useEffect(() => {
    if (shouldAnimate) {
      const typingTimer = setTimeout(() => {
        setShowTyping(false);
        setShowMessage(true);
      }, 1000);

      return () => clearTimeout(typingTimer);
    }
  }, [shouldAnimate]);

  const bubbleVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  } as const;

  const typingVariants = {
    animate: {
      opacity: [0.4, 1, 0.4] as number[],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // For non-animated bubbles (agent), just return static content
  if (!shouldAnimate) {
    return <ScrollIntoView>
        <div className={className}>{message}</div>
      </ScrollIntoView>;
  }

  return (
    <ScrollIntoView>
      <motion.div initial="hidden" animate="visible" variants={bubbleVariants}>
        <AnimatePresence mode="wait">
          {showTyping && (
            <motion.div
              key="typing"
              className={className}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* @ts-ignore */}
              <motion.span variants={typingVariants} animate="animate">
                ...
              </motion.span>
            </motion.div>
          )}

          {showMessage && (
            <motion.div
              key="message"
              className={className}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ScrollIntoView>
  );
};

// Sequential Customer Messages Component
const SequentialCustomerMessages = ({ messages, className }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const context = useContext(AppContext);

  useEffect(() => {
    if (currentMessageIndex < messages.length - 1) {
      // Each animation cycle takes 2 seconds (1.5s typing + 0.5s transition)
      const timer = setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1);
      }, context?.data.DELAY_BETWEEN_BLOCKS > 0 ? 2000 : 0);

      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, messages.length]);

  return (
    <ScrollIntoView>
      <div className="flex flex-col items-start">
        {messages.map((message, index) => (
          <div key={index}>
            {index <= currentMessageIndex && (
              <AnimatedChatBubble
                message={message}
                className={className}
                shouldAnimate={context?.data.DELAY_BETWEEN_BLOCKS > 0 ? index === currentMessageIndex : false}
              />
            )}
          </div>
        ))}
      </div>
    </ScrollIntoView>
  );
};

export const SequentialCustomerMessagesWrapper = ({
  messages,
  className,
  index,
  onComplete,
}) => {
  const [show, setShow] = useState(false);
  const [allMessagesShown, setAllMessagesShown] = useState(false);
  const context = useContext(AppContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, context?.data.DELAY_BETWEEN_BLOCKS > 0 ? 2000 : 0);

    return () => clearTimeout(timer);
  }, []);

  // Calculate when all messages are complete
  useEffect(() => {
    if (show && !allMessagesShown) {
      const totalTime = 2000 + messages.length * DELAY_BETWEEN_BLOCKS;
      const timer = setTimeout(() => {
        setAllMessagesShown(true);
        if (onComplete) {
          onComplete();
        }
      }, context?.data.DELAY_BETWEEN_BLOCKS > 0 ? totalTime : 0);

      return () => clearTimeout(timer);
    }
  }, [show, messages.length, allMessagesShown, onComplete]);

  return (
    <>
      {show && (
        <div className="customer-container">
          <img
            src="/chat-avatar-romero.png"
            alt="Chat bubble Romero"
            className="customer-avatar"
          />
          <SequentialCustomerMessages
            messages={messages}
            className={className}
          />
        </div>
      )}
    </>
  );
};
