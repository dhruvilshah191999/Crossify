import React, { Component } from "react";
import { motion } from "framer-motion";

class PlayGround extends Component {
  state = { category: ["Test"] };
  render() {
    return (
      <div>
        <div className="flex flex-row justify-center flex-wrap container p-4">
          {" "}
          {this.state.category.map((el) => {
            return (
              <motion.button
                type="button"
                className=" rounded-lg shadow p-4 mr-6 category-container mb-4 text-center   hover:border-lightbeta hover:shadow-lg active:bg-superlightbeta active:text-white hover:bg-offwhite  hover:text-extrabeta font-semibold"
                style={{ outline: "none" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                {el}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PlayGround;
