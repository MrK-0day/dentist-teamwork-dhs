import * as React from 'react'
import { Modal, message } from 'antd'

import PatientForm from '../form/PatientForm'

export const ModalPatient = ({ props }: { props: any }) => {
  console.log(props)
  function handleModal() {
    if(props.targetModal=='delete') {
      props.asyncDeletePatient()
      props.asyncInitData()
      props.closeModal()
      message.success('Deleted')
    }
    if(props.targetModal=='add') {
      props.asyncAddPatient()
      props.asyncInitData()
      props.closeModal()
      message.success('Added')
    }
    if(props.targetModal=='edit') {
      props.asyncUpdatePatient()
      props.asyncInitData()
      props.closeModal()
      message.success('Updated')
    }
  }
  function handleCloseModal() {
    props.resetData()
    props.closeModal()
  }
  return (
    <Modal maskClosable={false} onOk={handleModal} title={props.targetModal} visible={props.targetModal!='none'?true: false}
       onCancel={handleCloseModal}>
      <PatientForm />
    </Modal>
  )
}
