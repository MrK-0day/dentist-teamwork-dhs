import * as React from 'react'
import { Modal } from 'antd'

import { AddMedialRecord } from '../form/AddMedialRecord'
import { DrawerAddNoteTooth } from '../drawer/DrawerAddNoteTooth'

export const ModalMedialRecord = ({ props }: { props: any }) => {
  async function onCloseOK () {
    let flag = await props.addMedialRecords()
    if (flag) {
      // thanh cong
      props.onCloseModalAdd('OK')
      // console.log(props.listtooth)
    } else {
      // that bai
      console.log(false)
    }
  }
  function onCloseCancel () {
    props.onCloseModalAdd('CANCEL')
  }
  return (
    <Modal title='Tạo Hồ Sơ Bệnh Án' visible={props.visible}
      onOk={onCloseOK} onCancel={onCloseCancel} okText='Tạo' cancelText='Hủy'>
      <AddMedialRecord props={props} />
      <DrawerAddNoteTooth props={props} />
    </Modal>
  )
}
