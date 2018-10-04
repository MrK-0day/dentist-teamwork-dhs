import * as React from 'react'
import { Button } from 'antd'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
 export const TableDoctor = ({ props }: { props: any }) => {
    const column = [
        {headerName: 'Name', field: 'name'},
        {headerName: 'Gender', field: 'gender'},
        {headerName: 'Birthdate', field: 'dob'},
        {headerName: 'Spec.', field: 'specialize'},
        {headerName: 'Username', field: 'username'},
        {headerName: 'Phone', field: 'phone'},
        {headerName: 'Nationality', field: 'nationality'},
        {headerName: 'E-mail', field: 'email'},
        {headerName: 'Actions', field: 'actions'}
    ]
     return(
    <div
        className="ag-theme-balham"
        style={{
          height: '500px',
          width: '600px' }}>
          <AgGridReact
              columnDefs={column}
              rowData={[
                  {
                    username: 'nva',
                    password: '123456',
                    fullname: 'nguyen van a',
                    specialize: 'Tham My',
                    gender: 'male',
                    dob: '16-01-1995',
                    address: '123 ABC',
                    phone:'012341251',
                    email:'abc@nva.cde',
                    nationality:'VietNam',
                    refBy:'ABC'
                  }
              ]}>
          </AgGridReact>
      </div>)
} 