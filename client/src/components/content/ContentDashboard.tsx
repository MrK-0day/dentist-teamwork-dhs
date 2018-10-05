import * as React from 'react'
import { connect } from 'react-redux'
import { Row, Divider } from 'antd'

import { BoxCard } from '../card/BoxCard'
import { TableDashboard } from '../ag-grid/TableDashboard'

const _ListBoxCard = [
  {
    title: 'Bệnh Nhân Khám Trong Ngày',
    count: 10
  },
  {
    title: 'Tổng Bác Sĩ',
    count: 20
  },
  {
    title: 'Số Ca Khám Bệnh',
    count: 30
  },
  {
    title: 'Tổng Doanh Thu',
    count: '123.456.789đ'
  }
]

class ContentDashboard extends React.Component<any, any> {
  render () {
    return (
      <div className='animated fadeIn'>
        <Row>
          {_ListBoxCard.map((value: any, index: number) => {
            return <BoxCard key={index} title={value.title} count={value.count} />
          })}
        </Row>
        <Divider />
        <TableDashboard props={this.props} />
      </div>
    )
  }
}

const mapState = (state: any) => state.Dashboard

const mapDispatch = (dispatch: any) => dispatch.Dashboard

export default connect(mapState, mapDispatch)(ContentDashboard)
