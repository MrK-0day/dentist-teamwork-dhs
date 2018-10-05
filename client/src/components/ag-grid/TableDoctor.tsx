import * as React from 'react'
import { AgGridReact } from 'ag-grid-react'

const columns = [
    {
      headerName:'Name',
      field:'fullname'
    },
    {
      headerName:'Gender',
      field:'gender'
    },
    {
      headerName:'Birthdate',
      field:'dob'
    },
    {
      headerName:'Specialize',
      field:'career'
    },
    {
      headerName:'Address',
      field:'address'
    },
    {
      headerName:'Phone',
      field:'phone'
    },
    {
      headerName:'Nationality',
      field:'nationality'
    },
    {
      headerName:'E-mail',
      field:'email'
    },
    {
      headerName:'Username',
      field:'username'
    },
    {
      headerName:'Actions',
      field:'actions'
    }
  ]

//   const frameworkComponents: any = {
//     actionRenderer
//   }

  export const TableDoctor = ({ props }: { props: any }) => {
    function onGridReady (params: any) {
      params.api.sizeColumnsToFit()
    }
    return (
      <div style={{ height: '93vh' }} className='ag-theme-balham'>
        <AgGridReact rowSelection='single' enableSorting={true} enableFilter={true} columnDefs={columns} rowData={props.doctorData} onGridReady={onGridReady} />
      </div>
    )
  }