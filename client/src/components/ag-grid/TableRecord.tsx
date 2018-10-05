import * as React from 'react'
import { AgGridReact } from 'ag-grid-react'

import noEditor from '../ag-grid/Record/noEditor'
import recordNumberEditor from '../ag-grid/Record/recordNumberEditor'
import costEditor from '../ag-grid/Record/costEditor'
import paidEditor from '../ag-grid/Record/paidEditor'
import actionRenderer from '../ag-grid/Record/actionRenderer'

const CL: any[] = [
  {
    headerName: 'Bệnh Nhân',
    field: 'fullname',
  },
  {
    headerName: 'Số Lần Khám',
    field: 'no',
    editable: true,
    cellEditor: 'noEditor'
  },
  {
    headerName: 'Mã Bệnh Án',
    field: 'recordNumber',
    editable: true,
    cellEditor: 'recordNumberEditor'
  },
  {
    headerName: 'Giai Đoạn',
    field: 'step'
  },
  {
    headerName: 'Tổng Tiền',
    field: 'cost',
    editable: true,
    cellEditor: 'costEditor'
  },
  {
    headerName: 'Đã Thanh Toán',
    field: 'paid',
    editable: true,
    cellEditor: 'paidEditor'
  },
  {
    headerName: 'Thao Tác',
    field: 'action',
    cellRenderer: 'actionRenderer'
  }
]

const frameworkComponents: any = {
  noEditor, recordNumberEditor, costEditor, paidEditor, actionRenderer
}

export const TableRecord = ({ props }: { props: any }) => {
  function onGridReady (params: any) {
    params.api.sizeColumnsToFit()
  }
  return (
    <div style={{ height: '93vh' }} className='ag-theme-balham'>
      <AgGridReact rowSelection='single' enableSorting={true} enableFilter={true} columnDefs={CL} rowData={props.listdatarecord} onGridReady={onGridReady} frameworkComponents={frameworkComponents} />
    </div>
  )
}
