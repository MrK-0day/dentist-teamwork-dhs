import * as React from 'react'
import { Modal } from 'antd'

import PatientForm from '../form/PatientForm'

export const ModalPatient = ({ props }: { props: any }) => {
  console.log(props.targetModal)
  return (
    <Modal maskClosable={false} onOk={props.asyncAddPatient} title={props.targetModal} visible={props.targetModal!='none'?true: false}
       onCancel={props.closeModal}>
      <PatientForm />
    </Modal>
  )
}
