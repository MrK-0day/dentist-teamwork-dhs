import * as React from 'react'
import { Modal } from 'antd'

import { EditMedialRecord } from '../form/EditMedialRecord'
import { DrawerAddNoteTooth } from '../drawer/DrawerAddNoteTooth'

export const ModalEditMedialRecord = ({ props }: { props: any }) => {
  function onCloseOK () {
    props.onCloseModalEdit('EDIT')
  }
  function onCloseCancel () {
    props.onCloseModalEdit('CANCEL')
  }
  return (
    <Modal title='Chỉnh Sửa Bệnh Án' visible={props.visibleedit}
      onOk={onCloseOK} onCancel={onCloseCancel} okText='Hoàn Tất' cancelText='Hủy'>
      <EditMedialRecord props={props} />
      <DrawerAddNoteTooth props={props} />
    </Modal>
  )
}
