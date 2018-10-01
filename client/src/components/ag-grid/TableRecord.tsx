import * as React from 'react'
import { AgGridReact } from 'ag-grid-react'

const CL = [
  {
    headerName: 'Bệnh Nhân',
    field: 'patient',
  },
  {
    headerName: 'Số Lần Khám',
    field: 'no'
  },
  {
    headerName: 'Mã Bệnh Án',
    field: 'recordnumber'
  },
  {
    headerName: 'Giai Đoạn',
    field: 'step'
  },
  {
    headerName: 'Tổng Tiền',
    field: 'cost'
  },
  {
    headerName: 'Đã Thanh Toán',
    field: 'paid'
  }
]

const DT = [
  {
    patient: 'Phan Quốc Tuấn',
    no: '0',
    recordnumber: 'RHM0001',
    step: '0',
    cost: '10.000.000',
    paid: '5.000.000'
  }
]

export const TableRecord = ({ props }: { props: any }) => {
  return (
    <div style={{ height: '90vh' }} className='ag-theme-balham'>
      <AgGridReact enableSorting={true} enableFilter={true} columnDefs={CL} rowData={DT} />
    </div>
  )
}
