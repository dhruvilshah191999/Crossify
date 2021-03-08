import React from "react";
//import TableData from "components/Tables/TableData.js";

export default function FilesTab() {
  return (
    <>
      <div className="text-right text-sm font-semibold m-4">
        <input
          type="file"
          className="custom-file-input hidden"
          id="inputGroupFile01"
        ></input>
        <label
          className="custom-file-label cursor-pointer p-3 text-white bg-secondary p-2 rounded-lg hover:bg-beta hover:text-white"
          for="inputGroupFile01"
        >
          <i class="fas fa-file-upload"></i> &nbsp;Upload File
        </label>
      </div>
      {/* <TableData /> */}
    </>
  );
}
