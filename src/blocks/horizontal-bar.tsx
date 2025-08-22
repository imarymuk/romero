import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ScrollIntoView } from "../components/scroll-into-view";
import { AppContext } from "../context/app.context";

export function HorizontalBar({ index, className }: { index: number, className?: string }) {
  const context = useContext(AppContext);
  
  return (
    <ScrollIntoView>
      <motion.div variants={context?.data.FADE_IN_ANIMATION} className={`app-border ${className}`} ></motion.div>
    </ScrollIntoView>
  );
}
