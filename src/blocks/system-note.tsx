import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ScrollIntoView } from "../components/scroll-into-view";
import { AppContext } from "../context/app.context";

export function SystemNote({ message, index }: { message: string; index: number }) {
  const context = useContext(AppContext);

  return (
    <ScrollIntoView>
      <motion.p
        variants={context?.data.FADE_IN_ANIMATION}
        className="text-center max-w-2xl text-lg mx-auto"
      >
        {message}
      </motion.p>
    </ScrollIntoView>
  );
}
