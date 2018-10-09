import * as React from 'react'
import { Modal, message } from 'antd'

import PatientForm from '../form/PatientForm'

export const ModalPatient = ({ props }: { props: any }) => {
  var modalTitle = ''
  if(props.targetModal === 'add') modalTitle = 'Thêm bệnh nhân'
  else if (props.targetModal === 'delete') modalTitle = 'Xóa bệnh nhân'
  else if (props.targetModal === 'edit') modalTitle = 'Sửa bệnh nhân'
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
    <Modal maskClosable={false} onOk={handleModal} title={modalTitle} visible={props.targetModal!='none'?true: false}
       onCancel={handleCloseModal}>
      <PatientForm />
    </Modal>
  )
}