import * as React from 'react'
import { AgGridReact } from 'ag-grid-react'

const CL = [
  {
    headerName: 'Bệnh Nhân',
    field: 'fullname',
  },
  {
    headerName: 'Ngày',
    field: 'ngay',
  },
  {
    headerName: 'Phòng',
    field: 'room',
  },
  {
    headerName: 'Nội Dung',
    field: 'content',
  },
  {
    headerName: 'Giai Đoạn',
    field: 'step',
  },
  {
    headerName: 'Bác Sĩ',
    field: 'doctor',
  },
]

export const TableSchedule = ({ props }: { props: any }) => {
  function onGridReady (params: any) {
    params.api.sizeColumnsToFit()
  }
  return (
    <div style={{ height: '93vh' }} className='ag-theme-balham'>
      <AgGridReact rowSelection='single' enableSorting={true} enableFilter={true} columnDefs={CL} rowData={props.listSchedule} onGridReady={onGridReady} />
    </div>
  )
}
