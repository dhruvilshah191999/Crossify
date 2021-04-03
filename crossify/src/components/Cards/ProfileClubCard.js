import React from "react";
import { notifyCopied, notifyLiked } from "notify";
import { motion } from "framer-motion";
//this notification is not working
function ProfileClubCard(props) {
  console.log(props.data);
  return (
    <motion.div
      className="relative bg-white flex-shrink-0 hover:shadow-lg overflow-hidden border-b-4 border-blue-500 mx-2 mb-4 rounded shadow "
      style={{ width: 320, marginLeft: "0.5rem", marginRight: "0.5rem" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.9 }}
    >
      <img
        src="https://images.unsplash.com/photo-1573748240263-a4e9c57a7fcd"
        alt="People"
        className="w-full object-cover h-32 sm:h-48 md:h-64"
      />
      <div className="p-4 md:p-6">
        <p className="text-blue-500 font-semibold text-xs mb-1 leading-none">
          {props.tags.map((el, i) => {
            if (i === props.tags.length - 1) {
              return <span>{el} </span>;
            }
            return <span>{el} &bull; </span>;
          })}
        </p>

        <div className="float-right">
          <motion.button
            className="text-red-500 bg-white shadow border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => notifyLiked()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-heart"></i>
          </motion.button>
          <motion.button
            className="text-blue-500 bg-white shadow border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => notifyCopied()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i class="fas fa-share-alt"></i>
          </motion.button>
        </div>
        <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">
          {props.club_name}
        </h3>
        <div className="text-sm flex items-center">
          <i class="fas fa-map-marker-alt text-sm mr-2"></i>
          <p className="leading-none"> {props.place}</p>
        </div>
      </div>
    </motion.div>
  );
}

ProfileClubCard.defaultProps = {
  club_name: "Badshah Gang",
  tags: ["Tech", "Science"],
  place: "Ahmedabad , GJ",
};

export default ProfileClubCard;
