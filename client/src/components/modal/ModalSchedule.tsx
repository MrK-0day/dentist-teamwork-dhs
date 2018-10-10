import * as React from 'react'
import { Modal } from 'antd'

import { AddSchedule } from '../form/AddSchedule'

export const ModalSchedule = ({ props }: { props: any }) => {
  function onCloseOK () {
    props.onCloseModal()
    props.resetInitData()
  }
  function onCloseCancel () {
    props.onCloseModal()
  }
  return (
    <Modal title='Tạo Lịch Hẹn' visible={props.visible}
      onOk={onCloseOK} onCancel={onCloseCancel} okText='Tạo' cancelText='Hủy'>
      <AddSchedule props={props} />
    </Modal>
  )
}
