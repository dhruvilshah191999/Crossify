import React, { useEffect, useState } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useRowSelect,
  usePagination,
} from "react-table";

import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import ProfileReview from "components/Modals/ProfileReview.js";
import AcceptButton from "components/Modals/AcceptMemberButton";
import RejectButton from "components/Modals/RejectMemberButton";
import ToggleDarkMode from "components/Inputs/ToggleDarkMode";
import dataTable from "./demorequests";

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
  column: { filterValue, setFilter, preFilteredRows, profile },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[profile]);
    });
    return [...options.values()];
  }, [profile, preFilteredRows]);

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

export default function App() {
  const [isLight, setIsLight] = useState(1);
  const getSelectedAndReject = (e) => {
    const profilelist = selectedFlatRows.map((el) => el.values);
    //now do whatever you want to do
    //todo GOLU Get the profile or whatever uniquely profileentified thing and change the status to arriving to all the profilelist
    console.log(profilelist);
  };
  const getSelectedAndAccept = (broadcastMessage) => {
    console.log(broadcastMessage);
    //todo GOLU broadcast/Notification to added to all the selected users
    const profilelist = selectedFlatRows.map((el) => el.values);
    console.log(profilelist);
  };
  const openModal = () => {
    ModalManager.open(<ProfileReview onRequestClose={() => true} />);
  };

  const data = React.useMemo(() => dataTable, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Profile",
        accessor: "profilePhoto",
        disableFilters: true,
        Cell: ({ value }) => {
          return (
            <div className="flex items-center">
              <img
                src={value}
                alt="eventPhoto"
                className="w-12 border h-12 rounded-full"
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

        disableFilters: true,
      },
      {
        Header: "occupation",
        accessor: "occupation",
        disableFilters: true,
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
          } else if (value === "accepted") {
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
        accessor: "actions", // here add _profile of event request so easy to attach with the buttons
        Cell: ({ value }) => (
          <div className="flex flex-row  justify-evenly">
            <button title="Arrived">
              <i class="fas fa-calendar-check text-green-500 text-lg focus:outline-none"></i>
            </button>
            <button className="ml-2" title="Remove">
              <i class="fas fa-window-close text-red-500 text-lg"></i>
            </button>
            <button className="" title="View" onClick={openModal}>
              <i class="fas fa-eye text-blue-500 text-lg ml-2"></i>
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

      // Or, overrprofilee the default text filter to use
      // "startWith"
      text: (rows, profile, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[profile];
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
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowprofiles },
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
          profile: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the indivprofileual row's getToggleRowSelectedProps method
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
                  <AcceptButton
                    handleAcceptance={getSelectedAndAccept}
                  ></AcceptButton>
                  <RejectButton
                    handleRejection={getSelectedAndReject}
                  ></RejectButton>
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
                        ? "fas fa-filter mr-4 text-gray-700 "
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
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <span className="ml-2 "></span>
                  <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    isLight={isLight}
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
                        "px-6 align-mprofiledle border border-solprofile py-3 text-xs  uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
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
                          className="border-t-0 px-6 align-mprofiledle border-l-0 border-r-0 text-xsm whitespace-no-wrap p-4"
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
                  style={{ wprofileth: "100px" }}
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