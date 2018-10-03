import * as React from 'react'

import { Button } from 'antd'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'


class TableDoctor extends React.Component<any, any> {
    constructor(props:any) {
        super(props)
        this.state= {
            column:[
                {headerName: 'Name', field: 'fullname'},
                {headerName: 'Gender', field: 'gender'},
                {headerName: 'Birthdate', field: 'dob'},
                {headerName: 'Spec.', field: 'specialize'},
                {headerName: 'Username', field: 'username'},
                {headerName: 'Phone', field: 'phone'},
                {headerName: 'Nationality', field: 'nationality'},
                {headerName: 'E-mail', field: 'email'},
                {headerName: 'Actions', cellRenderer: function (params: any){
                    return ('<Button>Edit</Button><Button>Delete</Button>')
                }}
            ],
            rowData:[
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
                },
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
                  },
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
                  },
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
                  },
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
                  },
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
                  },
                  ,{
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
            ]

        }
    }

    alert() {
        window.alert('A')
    }

    onGridReady(params: any) {
        params.api.sizeColumnsToFit()
    }

    render() {
        return (
            <div
                style={{
                    boxSizing: "border-box",
                    height: "500px",
                    width: "100%"
                }}
                className="ag-theme-balham">
                <AgGridReact
                    columnDefs={this.state.column}
                    enableColResize={true}
                    onGridReady={this.onGridReady.bind(this)}
                    rowData={this.state.rowData}
                />
            </div>
        )
    }
}

export default TableDoctor