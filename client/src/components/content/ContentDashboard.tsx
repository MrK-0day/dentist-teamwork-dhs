import * as React from 'react'
import { Row } from 'antd'

import { BoxCard } from '../card/BoxCard'

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

export const ContentDashboard = ({ props: any }) => {
  return (
    <div className='animated fadeIn'>
      <Row>
        {_ListBoxCard.map((value: any, index: number) => {
          return <BoxCard key={index} title={value.title} count={value.count} />
        })}
      </Row>
    </div>
  )
}
