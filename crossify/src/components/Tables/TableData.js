import React from 'react';
import {useSortBy, useTable,useFilters, useGlobalFilter } from 'react-table';
import ReactDOM from 'react-dom';
import './table.css';

	
	  
	  
	  const TableData = () => {
		const data = React.useMemo(
			() => [
			  {
				col1: 'Hello',
				col2: 'World',
			  },
			  {
				name: 'Harshil',
				email:'harshil14@gmail.com',
				contact:'9856420523'
			  },
			  {
				name: 'Dhruvil',
				email: 'dhruvil52@gmail.com',
				contact: '8522345236'
			  },
			],
			[]
		  )
		
		  const columns = React.useMemo(
			() => [
			  
			  {
				Header: 'Name',
				accessor: 'name',
				sortType: "basic",
				filter: "text"
			  },
			  {
				Header: 'Email',
				accessor: 'email',
				sortType: "basic",
				filter: "text"
			  },
			  {
				Header: 'Contact',
				accessor: 'contact',
				sortType: "basic",
				filter: "text"
			  }
			],
			[]
		  )
		  const DefaultColumnFilter = ({
			column: { filterValue, preFilteredRows, setFilter }
		  }) => {
			const count = preFilteredRows.length;
		  
			return (
			  <input
				value={filterValue || ""}
				onChange={e => {
				  setFilter(e.target.value || undefined);
				}}
				placeholder={`Search ${count} records...`}
			  />
			);
		  };
		  
		  const GlobalFilter = ({
			preGlobalFilteredRows,
			globalFilter,
			setGlobalFilter
		  }) => {
			const count = preGlobalFilteredRows && preGlobalFilteredRows.length;
		  
			return (
			  <span>
				Search:{" "}
				<input
				  value={globalFilter || ""}
				  onChange={e => {
					setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
				  }}
				  placeholder={`${count} records...`}
				  style={{
					border: "0"
				  }}
				/>
			  </span>
			);
		  };
		const filterTypes = React.useMemo(
		  () => ({
			text: (rows, id, filterValue) => {
			  return rows.filter(row => {
				const rowValue = row.values[id];
				return rowValue !== undefined
				  ? String(rowValue)
					  .toLowerCase()
					  .startsWith(String(filterValue).toLowerCase())
				  : true;
			  });
			}
		  }),
		  []
		);
	  
		const defaultColumn = React.useMemo(
		  () => ({
			Filter: DefaultColumnFilter
		  }),
		  []
		);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		footerGroups,
		rows,
		prepareRow,
		state,
    	visibleColumns,
    	preGlobalFilteredRows,
    	setGlobalFilter
	}= useTable({
		columns,
		data,
		defaultColumn,
        filterTypes
	},
	useFilters,
	useGlobalFilter,
	useSortBy);
	return (
	<div id='prticipants' class="mt-6 lg:mt-0 rounded shadow bg-white">
		<table {...getTableProps()}  >
		  <thead>
		  <tr>
          <th
            colSpan={visibleColumns.length}
            style={{
              textAlign: "left"
            }}
          >
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </th>
        </tr>
			{headerGroups.map(headerGroup => (
			  <tr {...headerGroup.getHeaderGroupProps()}>
				{headerGroup.headers.map(column => (
				  <th
					{...column.getHeaderProps(column.getSortByToggleProps())}
					
				  >
					{column.render('Header')}
					<span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
				  </th>
				))}
			  </tr>
			))}
			
		</thead>
		  <tbody {...getTableBodyProps()}>
			{rows.map(row => {
			  prepareRow(row)
			  return (
				<tr {...row.getRowProps()}>
				  {row.cells.map(cell => {
					return (
					  <td
						{...cell.getCellProps()}
						
					  >
						{cell.render('Cell')}
					  </td>
					)
				  })}
				</tr>
			  )
			})}
		  </tbody>
		  <tfoot>
        {footerGroups.map(group => (
          <tr {...group.getFooterGroupProps()}>
            {group.headers.map(column => (
              <td {...column.getFooterProps(column.getSortByToggleProps())}>{column.render("Header")}
			   <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
			  </td>
            ))}
          </tr>
        ))}
      </tfoot>
		</table>
	</div>
	  )
	};


export default TableData
