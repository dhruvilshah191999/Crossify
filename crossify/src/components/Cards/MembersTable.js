import React, { useEffect } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";

import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import ViewProfile from "components/Modals/ViewProfile";
import PromoteMemberButton from "components/Modals/PromoteMemberButton";
import DemoteMemberButton from "components/Modals/DemoteMemberButton";
import KickMemberButton from "components/Modals/KickMemberButton";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className="text-gray-700 font-normal ml-2 ">
      {/* Search:{" "} */}
      <i class="fas fa-search mr-4 text-gray-700"></i>
      <input
        className="px-2 py-1  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline ease-linear transition-all duration-150"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  );
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default function App() {
  //todo GOLU pass name here too I don't know how if you cant do it then just remove it view button (NOT REQUIRED)
  const openModal = () => {
    ModalManager.open(<ViewProfile onRequestClose={() => true} />);
  };
  const color = "light";
  const data = React.useMemo(
    () => [
      {
        eventName: "Cricket Tournament",
        name: "Harshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Member",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
      {
        eventName: "Cricket Tournament",
        name: "arshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Moderator",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
      {
        eventName: "Cricket Tournament",
        name: "Harshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Member",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
      {
        eventName: "Cricket Tournament",
        name: "Harshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Member",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
      {
        eventName: "Cricket Tournament",
        name: "arshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Moderator",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
      {
        eventName: "Cricket Tournament",
        name: "Harshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Member",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
      {
        eventName: "Cricket Tournament",
        name: "Harshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Member",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
      {
        eventName: "Cricket Tournament",
        name: "arshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Moderator",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
      {
        eventName: "Cricket Tournament",
        name: "Harshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Member",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
      {
        eventName: "Cricket Tournament",
        name: "Harshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Member",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
      {
        eventName: "Cricket Tournament",
        name: "arshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Moderator",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
      {
        eventName: "Cricket Tournament",
        name: "Harshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Member",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
      {
        eventName: "Cricket Tournament",
        name: "Harshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Moderator",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
      {
        eventName: "Cricket Tournament",
        name: "arshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Moderator",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
      {
        eventName: "Cricket Tournament",
        name: "Harshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Member",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
      {
        eventName: "Cricket Tournament",
        name: "Harshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Member",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
      {
        eventName: "Cricket Tournament",
        name: "arshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Admin",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
      {
        eventName: "Cricket Tournament",
        name: "Harshil Patel",
        joinedDate: "11/2/2000",
        location: "Ahmedabad",
        role: "Member",
        reports: 3,
        eventOrganized: 3,
        actions: " ",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
        disableFilters: true,
        Cell: ({ value }) => {
          return <span className="font-semibold text-sm">{value}</span>;
        },
      },

      {
        Header: "Joined At",
        accessor: "joinedDate", // accessor is the "key" in the data

        disableFilters: true,
      },
      {
        Header: "Location",
        accessor: "location", // accessor is the "key" in the data

        disableFilters: true,
      },
      {
        Header: "role",
        accessor: "role", // accessor is the "key" in the data
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: ({ value }) => {
          var myColor = "red";
          if (value === "Member") {
            myColor = "orange";
          } else if (value === "Moderator") {
            myColor = "green";
          } else if (value === "Admin") {
            myColor = "blue";
          }
          return (
            <span
              class={
                "relative inline-block px-3 py-1 font-semibold text-" +
                myColor +
                "-900 leading-tight"
              }
            >
              <span
                aria-hidden
                class={
                  "absolute inset-0 bg-" +
                  myColor +
                  "-200 opacity-50 rounded-full"
                }
              ></span>
              <span class="relative">{value}</span>
            </span>
          );
          return (
            <>
              <i
                className={
                  "fas fa-circle text-xs text-" + myColor + "-500 mr-2"
                }
              ></i>{" "}
              {value}
            </>
          );
        },
        disableFilters: true,
      },

      {
        Header: "Events",
        accessor: "eventOrganized", // accessor is the "key" in the data

        disableFilters: true,
      },
      {
        Header: "Reports",
        accessor: "reports", // accessor is the "key" in the data

        disableFilters: true,
      },

      {
        Header: "Actions",
        accessor: "actions", // here add _id of event request so easy to attach with the buttons
        Cell: ({ value }) => (
          <div className="flex flex-row  justify-evenly">
            <PromoteMemberButton
              name="Harshil Patel"
              promoteMember={() => console.log("Get id and promote him")}
            />
            <DemoteMemberButton
              name="Harhsil Patel"
              demoteMember={() => console.log("Get id and demote him")}
            />
            <KickMemberButton
              name="Harshil Patel"
              kickMember={() =>
                console.log(
                  "pass name or username of the member and id to remove him from the club"
                )
              }
            />

            <button className="" title="View" onClick={openModal}>
              <i class="fas fa-eye text-blue-500 text-lg"></i>
            </button>
          </div>
        ),
        disableFilters: true,
        disableSortBy: true,
      },
    ],
    []
  );
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.

      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    setFilter,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,

      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },

    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination
  );

  // useEffect(() => {
  //   // This will now use our custom filter for age
  //   setFilter("role", SelectColumnFilter);
  // }, [SelectColumnFilter]);

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <div className="flex flex-row">
                {" "}
                <div>
                  <h3
                    className={
                      "font-semibold text-lg " +
                      (color === "light" ? "text-gray-800" : "text-white")
                    }
                  >
                    Member List
                  </h3>
                </div>
                <div className="ml-auto">
                  <i class="fas fa-filter mr-4 text-gray-700 "></i>
                  <select
                    className="border bg-white rounded px-3 py-1 outline-none text-sm"
                    onChange={(e) => {
                      setFilter("role", e.target.value || undefined);
                    }}
                  >
                    <option value="">All</option>

                    <option value="Member">Member</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <span className="ml-2 "></span>
                  <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table
            {...getTableProps()}
            className="items-center w-full bg-transparent border-collapse"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs  uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-gray-100 text-gray-600 border-gray-200"
                          : "bg-blue-800 text-blue-300 border-blue-700")
                      }
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                      {/* Render the columns filter UI */}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
              <tr></tr>
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xsm whitespace-no-wrap p-4"
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-2 flex flex-row justify-center">
            <div className="mr-auto pl-4">
              Show entries : &nbsp;&nbsp;
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
                className="border bg-white rounded px-3 py-1 outline-none text-sm"
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                className="rounded-lg shadow bg-blue-600 text-white px-2 py-1"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <i class="fas fa-step-backward"></i>
              </button>{" "}
              <button
                className="rounded-lg shadow bg-blue-600 text-white px-2 py-1"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <i class="fas fa-chevron-left"></i>
              </button>{" "}
              <span className="mx-4">
                <strong>{pageIndex + 1}</strong>{" "}
              </span>
              <button
                className="rounded-lg shadow bg-blue-600 text-white px-2 py-1"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <i class="fas fa-chevron-right"></i>
              </button>{" "}
              <button
                className="rounded-lg shadow bg-blue-600 text-white px-2 py-1"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <i class="fas fa-step-forward"></i>
              </button>{" "}
            </div>
            <div className="ml-auto mr-4 mt-1 overflow">
              <span>
                Go to page:{" "}
                <input
                  className="px-2 py-1 mr-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline ease-linear transition-all duration-150"
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                  style={{ width: "100px" }}
                />
                of {pageOptions.length}
              </span>{" "}
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
}
