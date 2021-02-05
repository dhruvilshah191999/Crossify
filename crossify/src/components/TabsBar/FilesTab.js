import React from "react";
import TableData from "components/tables/tableData.js";

export default function FilesTab() {
  return (
    <>      
      <div className="text-right text-lg font-bold m-4">
        <input
          type="file"
          className="custom-file-input hidden"
          id="inputGroupFile01"
        ></input>
        <label
          className="custom-file-label cursor-pointer bg-gray-300 p-4 rounded-lg hover:bg-alpha hover:text-white"
          for="inputGroupFile01"
        >
          Add File <i class="far fa-file"></i>
        </label>
      </div>
      <TableData/>
    </>
  );
}
