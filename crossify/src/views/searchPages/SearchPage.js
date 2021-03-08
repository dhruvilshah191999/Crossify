import React, { useState } from "react";
import SearchNavbar from "components/Navbars/SearchNavbar";
import SideFilter from "components/Sidebar/SideFilter";
const SearchPage = () => {
  const [checking, setChange] = useState(false);
  var change = (check) => {
    setChange(!checking);
  };
  return (
    <div>
      <SearchNavbar change={change} />
      <SideFilter change={checking} />
    </div>
  );
};
export default SearchPage;
