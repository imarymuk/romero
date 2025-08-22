import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScrollIntoView } from "../components/scroll-into-view";
import { AppContext } from "../context/app.context";
import AddEmojiIcon from "../icons/add-emoji";
import MinusEmojiIcon from "../icons/minus-emoji";

export function Barometer({
  block,
  index,
  initialReading,
  setBarometerReading,
}) {
  const context = useContext(AppContext);

  const [barometerReading, _] = useState(() => {
    return initialReading + block.points;
  });

  useEffect(() => {
    setBarometerReading(initialReading + block.points);
  }, [barometerReading]);

  return (
    <ScrollIntoView>
      <motion.div
        variants={context?.data.FADE_IN_ANIMATION}
        className="meter css-i6k5v0"
      >
        <div className="reaction-emojis">
            {block.points > 0 &&
            Array.from({
              length:
              block.points >= 10
                ? 3
                : block.points >= 5
                ? 2
                : block.points >= 2
                ? 1
                : 1,
            }).map((_, i) => <AddEmojiIcon key={i} />)}
            {block.points < 0 &&
              Array.from({
                length:
                block.points <= -10
                  ? 3
                  : block.points <= -5
                  ? 2
                  : block.points <= -2
                  ? 1
                  : 1,
              }).map((_, i) => <MinusEmojiIcon key={i} />)}
        </div>
        <p className="font-extrabold mx-auto text-center text-2xl my-7">
          Current frustration level: {barometerReading}
        </p>
        <div className="emojis">
          <img
            className="emoji emoji-happy"
            src="/icons/emoji-happy.svg"
            alt="Happy Emoji"
          />
          <img
            className="emoji emoji-neutral"
            src="/icons/emoji-neutral.svg"
            alt="Neutral Emoji"
          />
          <img
            className="emoji emoji-angry"
            src="/icons/emoji-angry.svg"
            alt="Angry Emoji"
          />
        </div>
        <div className="scale-container">
          <div className="ui-div scale css-4wjyey"></div>
          <motion.div
            className="needle"
            animate={{
              left: ["0%", `${barometerReading}%`],
            }}
            transition={{
              left: {
                duration: 0.3,
                ease: "easeOut",
                delay: 0.2,
              },
            }}
          />
        </div>
      </motion.div>
      <motion.p
        key={"barometer-message" + index}
        variants={context?.data.FADE_IN_ANIMATION}
        className="text-center max-w-lg text-lg mx-auto mt-8"
      >
        {block.message}
      </motion.p>
    </ScrollIntoView>
  );
}
