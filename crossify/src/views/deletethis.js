import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useFilters, useTable } from "react-table";

import makeData from "./makeData";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ columns, data, ageOutside }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // setFilter is the key!!!
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters
  );

  // Listen for input changes outside
  useEffect(() => {
    // This will now use our custom filter for age
    setFilter("age", ageOutside);
  }, [ageOutside]);

  // Render the UI for your table
  return (
    <>
      {/* We can also directly add an input here
      and call setFilter directly on every input change
      if you don't mind your Table component including it
      No need for useEffect or a listener prop
       */}
      <input
        placeholder="Firstname"
        onChange={(e) => setFilter("firstName", e.target.value)}
      />
      <table style={{ marginTop: 30 }} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

// Use a custom filter function
const customFilterFunction = (rows, id, filterValue) =>
  rows.filter((row) => row.original.age >= filterValue);

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
            // Set a custom filter for age
            filter: customFilterFunction,
          },
          {
            Header: "Visits",
            accessor: "visits",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
          },
        ],
      },
    ],
    []
  );

  const data = React.useMemo(() => makeData(40), []);
  const [age, setAge] = useState(0);
  return (
    <Styles>
      {/*Define the input outside here, and pass a
       listener prop to <Table> to update filter internally
       You could also move useTable() outside and not inside <Table>,
       and just pass the instance to <Table>
      */}
      <p>Min age is {age}</p>
      <input
        type="range"
        value={age}
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
      <Table columns={columns} data={data} ageOutside={age} />
    </Styles>
  );
}

export default App;
