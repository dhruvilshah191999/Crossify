import React, { useState } from "react";

// components

import ProfileEventClub from "components/Cards/ProfileEventCard";

export default function MyClubs() {
  const [tabIndex, toggleTabIndex] = useState(1);
  const [likedClubs, setLikedClubs] = useState([
    {
      club_name: "Think Less Act More",
      place: "Punjab",
      tags: ["Magic", "Entertainment"],
    },
    {
      club_name: "Golfanatics",
      place: "Japan",
      tags: ["Sports", "Competition"],
    },
    {
      club_name: "Gamers Louge",
      place: "Rajkot",
      tags: ["Gaming", "Streaming"],
    },
  ]);
  const [joinedClubs, setJoinedClubs] = useState([
    {
      club_name: "Act Less Think More",
      place: "Kerala",
      tags: ["Stoicism", "Realist"],
    },
    {
      club_name: "Table Truckers",
      place: "California",
      tags: ["Friendly"],
    },
    {
      club_name: "Gamers Louge",
      place: "Rajkot",
      tags: ["Gaming", "Streaming"],
    },
  ]);

  return (
    <>
      <div className="relative flex justify-center  text-sm -mt-20">
        <div>
          <button
            className={
              tabIndex === 0
                ? "bg-lightalpha rounded-full py-2 px-4 text-white mr-2 outline-none"
                : "rounded-full py-2 px-4 text-white mr-2 outline-none"
            }
            onClick={() => toggleTabIndex(0)}
          >
            <i class="fas fa-history hover:text-white"></i>&nbsp; Past Events
          </button>
          <button
            className={
              tabIndex === 1
                ? "bg-lightalpha rounded-full py-2 px-4 text-white mr-2 outline-none "
                : "rounded-full py-2 px-4 text-white mr-2 outline-none hover:text-offwhite"
            }
            onClick={() => toggleTabIndex(1)}
          >
            {" "}
            <i class="fas fa-heart hover:text-offwhite "></i>&nbsp; Liked
          </button>

          <button
            className={
              tabIndex === 2
                ? "bg-lightalpha rounded-full py-2 px-4 text-white mr-2 outline-none "
                : "rounded-full py-2 px-4 text-white mr-2 outline-none hover:text-offwhite"
            }
            onClick={() => toggleTabIndex(2)}
          >
            {" "}
            <i class="fas fa-glass-cheers hover:text-offwhite"></i>&nbsp;
            Upcoming
          </button>
        </div>
      </div>
      <div>
        <div class="ml-4 mt-10 bg-gray-200 flex flex-col flex-wrap lg:flex-row">
          {tabIndex === 1
            ? likedClubs.map((el) => (
                <ProfileEventClub
                  club_name={el.club_name}
                  place={el.place}
                  tags={el.tags}
                ></ProfileEventClub>
              ))
            : joinedClubs.map((el) => (
                <ProfileEventClub
                  club_name={el.club_name}
                  place={el.place}
                  tags={el.tags}
                ></ProfileEventClub>
              ))}
        </div>
      </div>
    </>
  );
}
