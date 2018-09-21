import * as React from 'react'
import { Col, Card } from 'antd'

export const BoxCard = ({ title, count } : { title: string, count: string }) => {
  return (
    <Col style={{ paddingTop: 15, paddingLeft: 5, paddingRight: 5 }} span={24 / 4}>
      <Card hoverable className='box-card'>
        <p style={{ color: '#fff', fontSize: '3em', marginBottom: 5 }}>{count}</p>
        <p style={{ color: '#fff', fontSize: '1.25em', marginBottom: 0 }}>{title}</p>
      </Card>
    </Col> 
  )
}
