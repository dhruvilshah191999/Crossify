// import React, { Component } from "react";
// import { motion } from "framer-motion";

// function ToggleDarkMode({ isOn, ...props }) {
//   const className = `switch ${isOn ? "on" : "off"}`;

//   return (
//     <motion.div animate className={className} {...props}>
//       <motion.div animate />
//     </motion.div>
//   );
// }

// export default ToggleDarkMode;
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

/**
 * This is an example of layout animations in Framer Motion 2.
 *
 * It's as simple as adding a `layout` prop to the `motion.div`. When
 * the flexbox changes, the handle smoothly animates between layouts.
 *
 * Try adding whileHover={{ scale: 1.2 }} to the handle - the layout
 * animation is now fully compatible with user-set transforms.
 */

export default function App({ isOn, ...props }) {
  return (
    <div className="switch" data-isOn={isOn} {...props}>
      <motion.div className="handle" layout transition={spring} />
    </div>
  );
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
