import * as React from 'react'
import { AgGridReact } from 'ag-grid-react'

import actionRenderer from './Patient/actionRenderer'

const columns = [
  {
    headerName:'Họ tên',
    field:'fullname'
  },
  {
    headerName:'Giới tính',
    field:'gender'
  },
  {
    headerName:'Ngày sinh',
    field:'dob'
  },
  {
    headerName:'Nghề nghiệp',
    field:'career'
  },
  {
    headerName:'Địa chỉ',
    field:'address'
  },
  {
    headerName:'SDT',
    field:'phone'
  },
  {
    headerName:'Quốc gia',
    field:'nationality'
  },
  {
    headerName:'E-mail',
    field:'email'
  },
  {
    headerName:'Người giới thiệu',
    field:'refBy'
  },
  {
    headerName:'Thao tác',
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