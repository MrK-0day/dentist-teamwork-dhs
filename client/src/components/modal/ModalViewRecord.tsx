import * as React from 'react'
import { Modal } from 'antd'

import { ViewRecord } from '../form/ViewRecord'

export const ModalViewRecord = ({ props }: { props: any }) => {
  function onCloseOK () {
    props.setState('visiblechitiet', false)
  }
  return (
    <Modal title={`Hồ Sơ Bệnh Án (${props.datachitiet.recordNumber})`} visible={props.visiblechitiet}
      onOk={onCloseOK} onCancel={onCloseOK} okText='Đóng'>
      <ViewRecord props={props} />
    </Modal>
  )
}