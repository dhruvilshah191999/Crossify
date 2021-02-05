import React from "react";
import { MDBDataTable } from "mdbreact";

export default function TableData() {
  {
    /* <table className="table-fixed w-full mt-10">
          <thead className="bg-gray-200">
            <tr>
              <th className="w-30">File name</th>
              <th className="w-30">Uploaded by</th>
              <th className="w-40">Descriptipn</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="#"> clubdetaills.pdf </a>{" "}
              </td>
              <td>Adam</td>
              <td>this file is about all the details of this club.</td>
            </tr>
            <tr>
              <td>
                <a href="#"> clubrules.pdf </a>{" "}
              </td>
              <td>Adam gilchrist is now </td>
              <td>
                this file is about all the rules of this club and everyone have
                to follow this.
              </td>
            </tr>
            <tr>
              <td>
                <a href="#">clubAttendance.pdf </a>{" "}
              </td>
              <td>Chris</td>
              <td>
                this file is about all the people who joined this club on which
                date and when.
              </td>
            </tr>
          </tbody>
          <tfoot className="bg-gray-200">
            <tr>
              <th className="w-30">File name</th>
              <th className="w-30">Uploaded by</th>
              <th className="w-40">Descriptipn</th>
            </tr>
          </tfoot>
        </table> */
  }

  const data = {
    columns: [
      {
        label: "File name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Uploaded by",
        field: "uploadBy",
        sort: "asc",
        width: 270,
      },
      {
        label: "Descriptipn",
        field: "description",
        sort: "asc",
        width: 200,
      },
    ],
    rows: [
      {
        name: "Tiger Nixon",
        uploadBy: "System Architect",
        description: "Edinburgh",
      },
      {
        name: "Garrett Winters",
        uploadBy: "Accountant",
        description: "Tokyo",
      },
      {
        name: "Ashton Cox",
        uploadBy: "Junior Technical Author",
        description: "San Francisco",
      },
      {
        name: "Cedric Kelly",
        uploadBy: "Senior Javascript Developer ",
        description: "Edinburgh",
      },
      {
        name: "Airi Satou",
        uploadBy: "Accountant",
        description: "Tokyo",
      },
      {
        name: "Donna Snider",
        uploadBy: "Customer Support",
        description: "New York",
      },
    ],
  };

  return (
    <MDBDataTable responsive striped bordered small data={data}></MDBDataTable>
  );
}
