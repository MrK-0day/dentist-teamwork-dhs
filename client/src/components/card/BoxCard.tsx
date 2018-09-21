import * as React from 'react'
import { Col, Card } from 'antd'

export const BoxCard = ({ title, count } : { title: string, count: string }) => {
  return (
    <Col style={{ paddingTop: 15, paddingLeft: 5, paddingRight: 5 }} span={24 / 6}>
      <Card hoverable className='box-card'>
        <div style={{ color: '#fff', fontSize: 35, paddingBottom: 5 }}>{count}</div>
        <div style={{ color: '#fff', fontSize: 16 }}>{title}</div>
      </Card>
    </Col> 
  )
}
