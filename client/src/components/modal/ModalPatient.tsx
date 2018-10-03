import * as React from 'react'
import { Modal } from 'antd'

import PatientForm from '../form/PatientForm'

export const ModalPatient = ({ props }: { props: any }) => {
  console.log(props.targetModal)
  function handleModal() {
    if(props.targetModal=='delete') {
      props.asyncDeletePatient()
    }
  }
  return (
    <Modal maskClosable={false} onOk={handleModal} title={props.targetModal} visible={props.targetModal!='none'?true: false}
       onCancel={props.closeModal}>
      <PatientForm />
    </Modal>
  )
}
