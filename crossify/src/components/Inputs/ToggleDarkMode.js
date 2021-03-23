import React, { Component } from "react";
import { motion } from "framer-motion";

function ToggleDarkMode({ isOn, ...props }) {
  const className = `switch ${isOn ? "on" : "off"}`;

  return (
    <motion.div animate className={className} {...props}>
      <motion.div animate />
    </motion.div>
  );
}

export default ToggleDarkMode;
