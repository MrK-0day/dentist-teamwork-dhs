import * as React from 'react'
import { Modal } from 'antd'

import { AddMedialRecord } from '../form/AddMedialRecord'

export const ModalMedialRecord = ({ props }: { props: any }) => {
  return (
    <Modal title='Tạo Hồ Sơ Bệnh Án' visible={props.visible}
      onOk={props.onCloseModalAdd} onCancel={props.onCloseModalAdd} okText='Tạo' cancelText='Hủy'>
      <AddMedialRecord props={props} />
    </Modal>
  )
}
