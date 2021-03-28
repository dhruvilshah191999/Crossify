// import React from "react";
// //import TableData from "components/Tables/TableData.js";

// export default function FilesTab() {
//   return (
//     <>

//       <div className="text-right text-sm font-semibold m-4">
//         <input
//           type="file"
//           className="custom-file-input hidden"
//           id="inputGroupFile01"
//         ></input>
//         <label
//           className="custom-file-label cursor-pointer p-3 text-white bg-secondary p-2 rounded-lg hover:bg-beta hover:text-white"
//           for="inputGroupFile01"
//         >
//           <i class="fas fa-file-upload"></i> &nbsp;Upload File
//         </label>
//       </div>
//       {/* <TableData /> */}
//     </>
//   );
// }
// import React from "react";
// import ReactDOM from "react-dom";
// import Moment from "moment";

// import FileBrowser, { Icons } from "react-keyed-file-browser";

// export default class FileTab extends React.Component {
//   render() {
//     return (
//       <FileBrowser
//         files={[
//           {
//             key: "cat.png",
//             modified: +Moment().subtract(1, "hours"),
//             size: 1.5 * 1024 * 1024,
//           },
//           {
//             key: "kitten.png",
//             modified: +Moment().subtract(3, "days"),
//             size: 545 * 1024,
//           },
//           {
//             key: "elephant.png",
//             modified: +Moment().subtract(3, "days"),
//             size: 52 * 1024,
//           },
//         ]}
//         icons={Icons.FontAwesome(4)}
//       ></FileBrowser>
//     );
//   }
// }

import React, { Component } from "react";
import FileTable from "components/Tables/FileTable";
class FilesTab extends Component {
  render() {
    return (
      <div>
        <FileTable></FileTable>
      </div>
    );
  }
}

export default FilesTab;
