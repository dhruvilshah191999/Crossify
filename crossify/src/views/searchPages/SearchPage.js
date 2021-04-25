import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "context/usercontext";
import SearchNavbar from "components/Navbars/SearchNavbar";
import SideFilter from "components/Sidebar/SideFilter";
const SearchPage = () => {
  const [checking, setChange] = useState(false);
  const [loading, setloading] = useState(false);
  const { category } = useContext(UserContext);
  useEffect(() => {
    setTimeout(() => {
      setloading(true);
    }, 700);
  }, []);
  var change = (check) => {
    setChange(!checking);
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
