import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { CSVLink } from "react-csv";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useRowSelect,
  usePagination,
} from "react-table";

import { notifyDownload } from "notify";
import EmptyTable from "components/sections/EmptyTable";
import BroadcastButton from "components/SweetAlerts/BroadcastButton";
import ArrivedButton from "components/SweetAlerts/ArrivedButton";
import ToggleDarkMode from "components/Inputs/ToggleDarkMode";
import moment from "moment";
import socket from "./../../utils/helper";
import { UserContext } from "context/usercontext";

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
        className={
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

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

export default function App(props) {
  const { id } = useParams();
  const { users } = useContext(UserContext);
  const getSelectedAndArrived = async (e) => {
    const IDlist = selectedFlatRows.map((el) => el.values.id);
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    var object = {
      event_id: id,
      userIds: IDlist,
    };
    const finaldata = await axios.post("/api/manage/arrived", object, config);
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      window.location.reload();
    }
  };
  const getSelectedAndBroadcast = async (broadcastMessage) => {
    //Find Event Name
    const token = localStorage.getItem("jwt");
    const IDlist = selectedFlatRows.map((el) => el.values.id);
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    const finalData = await axios.post(
      "/api/events/getEventName",
      { id },
      config
    );
    const eventName = finalData.data.eventName;
    const userName = users.username;
    const profilePhoto = users.profile_photo;
    IDlist.forEach((el) => {
      socket.emit("sendNotification", {
        date: new Date(),
        description: broadcastMessage,
        title: `Heyya...! New Message in Event ${eventName} by ${userName}🔊`,
        profile_photo: profilePhoto,
        user_id: el,
        token,
        target_id: id,
        target_val: "event",
      });
    });

    var object = {
      event_id: id,
      userName,
      eventName,
      userIds: IDlist,
      profile_photo: profilePhoto,
      target_val: "event",
      message: broadcastMessage,
      path: window.location.origin,
      token,
    };
    const finaldata = await axios.post("/api/manage/Broadcast", object, config);
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      //window.location.reload();
    }
  };

  const Coming = async (userid) => {
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    var object = {
      event_id: id,
      user_id: userid,
    };
    const finaldata = await axios.post(
      "/api/manage/userarrived",
      object,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      window.location.reload();
    }
  };

  const Remove = async (userid) => {
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    var object = {
      event_id: id,
      user_id: userid,
    };
    const finaldata = await axios.post("/api/manage/Cancelled", object, config);
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      window.location.reload();
    }
  };

  const [isLight, setIsLight] = useState(1);
  const data = React.useMemo(() => props.finaldata, [props.finaldata]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Profile",
        accessor: "photo", // accessor is the "key" in the data
        disableFilters: true,
        disableSortBy: true,
        Cell: ({ value }) => {
          return (
            <div className="flex items-center">
              <img
                src={value}
                alt="eventPhoto"
                className="w-10 border h-10 rounded-full"
              ></img>
            </div>
          );
        },
      },
      {
        Header: "Name",
        accessor: "name",
        disableFilters: true,
      },
      {
        Header: "Date",
        accessor: "date", // accessor is the "key" in the data
        Cell: ({ value }) => {
          return moment(value).format("DD MMM YYYY");
        },
        disableFilters: true,
      },
      {
        Header: "Status",
        accessor: "status", // accessor is the "key" in the data
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: ({ value }) => {
          var myColor = "red";
          if (value === "coming") {
            myColor = "orange";
          } else if (value === "arrived") {
            myColor = "green";
          }
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
        accessor: "id", // here add _id of event request so easy to attach with the buttons
        Cell: ({ value }) => (
          <div className="flex flex-row">
            <button title="Arrived" onClick={() => Coming(value)}>
              <i className="fas fa-calendar-check text-green-500 text-lg focus:outline-none"></i>
            </button>
            <button
              className="ml-4"
              title="Remove"
              onClick={() => Remove(value)}
            >
              <i className="fas fa-window-close text-red-500 text-lg"></i>
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
    prepareRow,
    state,
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
    selectedFlatRows,
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
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  // useEffect(() => {
  //   // This will now use our custom filter for age
  //   setFilter("status", SelectColumnFilter);
  // }, [SelectColumnFilter]);

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
                  <BroadcastButton
                    handleBroadcast={getSelectedAndBroadcast}
                  ></BroadcastButton>
                  <ArrivedButton
                    handleArriving={getSelectedAndArrived}
                  ></ArrivedButton>
                  <CSVLink
                    filename={"Attendees_List.csv"}
                    onClick={notifyDownload}
                    data={data.map(({ name, date, location, status }) => ({
                      name,
                      date,
                      location,
                      status,
                    }))}
                  >
                    <button
                      className="bg-green-500 ml-2 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      <i className="fas fa-file-download"></i>&nbsp; CSV Export
                    </button>
                  </CSVLink>
                </div>
                <div className="inline-block ml-2">
                  <ToggleDarkMode
                    isOn={!isLight}
                    onClick={() => setIsLight(!isLight)}
                  />
                </div>
                <div className="ml-auto">
                  <i
                    className={
                      isLight
                        ? "fas fa-filter mr-4 text-gray-700"
                        : "fas fa-filter mr-4 text-white"
                    }
                  ></i>
                  <span className="ml-2 "></span>
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
                    <option value="coming">
                      {/* <i className="fas fa-circle text-orange-500 mr-2"></i>{" "}  maybe later we can add that*/}
                      Coming
                    </option>
                    <option value="arrived">Arrived</option>
                    <option value="canceled">Cancelled</option>
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
        <div className="block w-full overflow-x-auto relative">
          {page.length === 0 && <EmptyTable isLight={isLight} />}
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
            {page.length === 0 && <div className="empty-table-space"></div>}
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
                    : "border bg-white rounded px-3 py-1 outline-none text-sm text-gray-700"
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
                <i className="fas fa-step-backward"></i>
              </button>{" "}
              <button
                className="rounded-lg shadow bg-blue-600 text-white px-2 py-1"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <i className="fas fa-chevron-left"></i>
              </button>{" "}
              <span className="mx-4">
                <strong>{pageIndex + 1}</strong>{" "}
              </span>
              <button
                className="rounded-lg shadow bg-blue-600 text-white px-2 py-1"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <i className="fas fa-chevron-right"></i>
              </button>{" "}
              <button
                className="rounded-lg shadow bg-blue-600 text-white px-2 py-1"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <i className="fas fa-step-forward"></i>
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
