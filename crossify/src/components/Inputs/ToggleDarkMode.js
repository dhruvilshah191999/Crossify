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
import { motion } from "framer-motion";

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
