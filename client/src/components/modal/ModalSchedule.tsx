import * as React from 'react'
import { Modal } from 'antd'

export const ModalSchedule = ({ props }: { props: any }) => {
  function onCloseOK () {
    props.onCloseModal()
  }
  function onCloseCancel () {
    props.onCloseModal()
  }
  return (
    <Modal title='Tạo Lịch Hẹn' visible={props.visible}
      onOk={onCloseOK} onCancel={onCloseCancel} okText='Tạo' cancelText='Hủy'>
      cc
    </Modal>
  )
}
