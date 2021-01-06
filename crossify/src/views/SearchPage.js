import React from "react";
import SearchNavbar from "components/Navbars/SearchNavbar";
import SideFilter from "components/Sidebar/SideFilter";
import ResultWindow from "components/ResultWindow";
const SearchPage = (props) => {
  return (
    <div>
      <SearchNavbar />
      <SideFilter />
    </div>
  );
};
export default SearchPage;
