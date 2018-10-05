import * as React from 'react'
import { AgGridReact } from 'ag-grid-react'

import actionRenderer from './Doctor/actionRenderer'

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
    headerName:'Job',
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
    headerName:'Referer',
    field:'refBy'
  },
  {
    headerName:'Actions',
    cellRenderer: 'actionRenderer'
  }
]

const frameworkComponents: any = {
  actionRenderer
}

export const TablePatient = ({ props }: { props: any }) => {
  function onGridReady (params: any) {
    params.api.sizeColumnsToFit()
  }
  // function handleDelete(event: any) {
  //   console.log(props)
  //   console.log(event.target)
  //   props.setMyState('target',event.target.value)
  //   props.openModal('delete')
  // }
  // function handleEdit(event: any) {
  //   console.log(event.target.value)
  //   props.asyncInitUpdatePatient(event.target.value)
  // }
  return (
    <div style={{ height: '93vh' }} className='ag-theme-balham'>
      <AgGridReact rowSelection='single' enableSorting={true} enableFilter={true} columnDefs={columns} rowData={props.patientData} onGridReady={onGridReady} frameworkComponents={frameworkComponents} />
    </div>
  )
}