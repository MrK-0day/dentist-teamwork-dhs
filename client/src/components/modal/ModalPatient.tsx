import * as React from 'react'
import { Modal } from 'antd'

import PatientForm from '../form/PatientForm'

export const ModalPatient = ({ props }: { props: any }) => {
  console.log(props.targetModal)
  return (
    <Modal maskClosable={false} footer={null} title={props.targetModal} visible={props.targetModal!='none'?true: false}
      onOk={props.AddPatient} onCancel={props.closeModal}>
      <PatientForm />
    </Modal>
  )
}
