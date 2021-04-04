import React, { useEffect, useState } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";
import { motion } from "framer-motion";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import Moment from "moment";
import EventReview from "components/Modals/EventReview";
import RequestForEvent from "components/Modals/RequestForEvent";
import ToggleDarkMode from "components/Inputs/ToggleDarkMode";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isLight,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className="text-gray-700 font-normal ml-2 ">
      {/* Search:{" "} */}
      <i
        class={
          isLight
            ? "fas fa-search mr-4 text-gray-700"
            : "fas fa-search mr-4 text-white"
        }
      ></i>
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

export default function App(props) {
  const [clubId, setClubId] = useState(props.club_id);
  const [eventFile, setEventFile] = useState(props.data);
  const openModal = (event) => {
    ModalManager.open(<EventReview onRequestClose={() => true} eventData={event}/>);
  };
  const openModal2 = () => {
    ModalManager.open(<RequestForEvent onRequestClose={() => true} club_id={clubId} isAdmin={ true}/>);
  };
  const [isLight, setIsLight] = useState(1);
  const data = React.useMemo(
    () => eventFile,
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Event Name",
        accessor: "event_name", // accessor is the "key" in the data
        disableFilters: true,
        Cell: ({ value }) => {
          return <span className="font-semibold text-sm">{value}</span>;
        },
      },
      {
        Header: "Organizer",
        accessor: "name",
        disableFilters: true,
      },
      {
        Header: "Date",
        accessor: "date", // accessor is the "key" in the data
        disableFilters: true,
        Cell: ({ value }) => {
          return Moment(value).format("MMMM Do YYYY");
        },
      },
      {
        Header: "Status",
        accessor: "status", // accessor is the "key" in the data
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: ({ value }) => {
          var myColor = "red";
          if (value === "pending") {
            myColor = "orange";
          } else if (value === "approved") {
            myColor = "green";
          } else if (value === "completed") {
            myColor = "blue";
          }
          // return (
          //   <span
          //     class={
          //       "relative inline-block px-3 py-1 font-semibold text-" +
          //       myColor +
          //       "-900 leading-tight"
          //     }
          //   >
          //     <span
          //       aria-hidden
          //       class={
          //         "absolute inset-0 bg-" +
          //         myColor +
          //         "-200 opacity-50 rounded-full"
          //       }
          //     ></span>
          //     <span class="relative">{value}</span>
          //   </span>
          // );
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
        Header: "Location",
        accessor: "location", // accessor is the "key" in the data

        disableFilters: true,
      },

      {
        Header: "Actions",
        accessor: "data", // here add _id of event request so easy to attach with the buttons
        Cell: ({ value }) => (
          <div className="flex flex-row  justify-evenly">
            <button className="ml-0" title="More" onClick={()=>openModal(value)}>
              <i class="fas fa-ellipsis-h text-blue-500 text-lg"></i>
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
  //   setFilter("status", SelectColumnFilter);
  // }, [SelectColumnFilter])

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (isLight ? "bg-white" : "bg-blue-900 text-white")
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
                      (isLight ? "text-gray-800" : "text-white")
                    }
                  >
                    Events Table
                  </h3>
                </div>
                <div className="inline-block ml-2">
                  <ToggleDarkMode
                    isOn={!isLight}
                    onClick={() => setIsLight(!isLight)}
                  />
                </div>
                <div className="ml-auto">
                  <button
                    className="bg-green-500 text-white  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => openModal2()}
                  >
                    <i class="fas fa-plus"></i>&nbsp; Create Event
                  </button>
                  <i
                    class={
                      isLight
                        ? "fas fa-filter mr-4 text-gray-700"
                        : "fas fa-filter mr-4 text-white"
                    }
                  ></i>
                  <select
                    className={
                      isLight
                        ? "border bg-white rounded px-3 py-1 outline-none text-sm"
                        : "border bg-white rounded px-3 py-1 outline-none text-sm text-gray-700"
                    }
                    onChange={(e) => {
                      setFilter("status", e.target.value || undefined);
                    }}
                  >
                    <option value="">All</option>
                    <option value="pending">
                      {/* <i className="fas fa-circle text-orange-500 mr-2"></i>{" "}  maybe later we can add that*/}
                      Pending
                    </option>
                    <option value="approved">Apporved</option>
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                  </select>
                  <span className="ml-2 "></span>
                  <GlobalFilter
                    isLight={isLight}
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
                        (isLight
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
                className={
                  isLight
                    ? "border bg-white rounded px-3 py-1 outline-none text-sm"
                    : "border bg-white rounded px-3 py-1 outline-none text-sm text-black"
                }
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
