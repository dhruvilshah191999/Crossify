import React, { useState,useContext, useEffect } from "react";
import { UserContext } from "context/usercontext";
import SearchNavbar from "components/Navbars/SearchNavbar";
import SideFilter from "components/Sidebar/ClubSideFilter";
const SearchPage = () => {
  const [checking, Setchange] = useState(false);
  const [loading, setloading] = useState(false);
  const { category } = useContext(UserContext);
  useEffect(() => {
    setTimeout(() => {
      setloading(true);
    }, 500);
  }, []);
  var change = (check) => {
    Setchange(!checking);
  };
  return (
    <>
      {loading ? (
        <div>
          <SearchNavbar change={change} />
          <SideFilter change={checking} category={category} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default SearchPage;
