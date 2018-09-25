import * as React from 'react'
import { Modal } from 'antd'

export const ModalStep = ({ props }: { props: any }) => {
  return (
    <Modal title='Add Medial Record' visible={props.visible}
      onOk={props.onCloseModalAdd} onCancel={props.onCloseModalAdd}>
      <input></input>
    </Modal>
  )
}
