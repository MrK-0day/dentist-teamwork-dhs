import * as React from 'react'
import { Layout, Menu, Icon } from 'antd'

import ContentDashboard from '../content/ContentDashboard'
import ContentPatient from '../content/ContentPatient'
import ContentMedialRecord from '../content/ContentMedialRecord'
import ContentSchedule from '../content/ContentSchedule'
import ContentDoctor from '../content/ContentDoctor'

const _ListMenuItem = [
  {
    key: 'dashboard',
    text: 'Dashboard',
    icon: 'dashboard'
  },
  {
    key: 'quanlybenhnhan',
    text: 'Quản Lý Bệnh Nhân',
    icon: 'contacts'
  },
  {
    key: 'quanlybenhan',
    text: 'Quản Lý Bệnh Án',
    icon: 'database'
  },
  {
    key: 'quanlylichkham',
    text: 'Quản Lý Lịch Hẹn',
    icon: 'calendar'
  },
  {
    key: 'baocao',
    text: 'Báo Cáo',
    icon: 'schedule'
  },
  {
    key:'quanlybacsi',
    text: 'Bác sĩ',
    icon: 'schedule'
  }
]

export const SiderNav = ({ props: { isCollapsed, onCollapsed, setState }, props } : { props: any }) => {
  function onSelectMenuItem ({ selectedKeys } : { selectedKeys: any }) {
    setState('isSelectMenuItem', selectedKeys[0])
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider theme='light' collapsible collapsed={isCollapsed} onCollapse={onCollapsed}>
        <Menu theme='light' defaultSelectedKeys={[_ListMenuItem[0].key]} mode='inline' onSelect={onSelectMenuItem}>
          {_ListMenuItem.map(value => {
            return (
              <Menu.Item key={value.key}>
                <Icon type={value.icon} theme='filled' />
                <span>{value.text}</span>
              </Menu.Item>
            )
          })}
        </Menu>
      </Layout.Sider>
      <Layout style={{ padding: 10 }}>
        {props.isSelectMenuItem === 'dashboard' && <ContentDashboard />}
        {props.isSelectMenuItem === 'quanlybenhnhan' && <ContentPatient />}
        {props.isSelectMenuItem === 'quanlybenhan' && <ContentMedialRecord />}
        {props.isSelectMenuItem === 'quanlylichkham' && <ContentSchedule />}
        {props.isSelectMenuItem === 'quanlybacsi'&& <ContentDoctor />}
      </Layout>
    </Layout>
  )
}
