import * as React from 'react'
import { Modal, message } from 'antd'

import PatientForm from '../form/PatientForm'

export const ModalPatient = ({ props }: { props: any }) => {
  var modalTitle = ''
  if(props.targetModal === 'add') modalTitle = 'Thêm bác sĩ'
  else if (props.targetModal === 'delete') modalTitle = 'Xóa bác sĩ'
  else if (props.targetModal === 'edit') modalTitle = 'Sửa bác sĩ'
  console.log(props)
  function handleModal() {
    if(props.targetModal=='delete') {
      // props.asyncDeletePatient()
      // props.asyncInitData()
      // props.closeModal()
      message.success('Đã xóa')
    }
    if(props.targetModal=='add') {
      // props.asyncAddPatient()
      // props.asyncInitData()
      // props.closeModal()
      message.success('Đã thêm')
    }
    if(props.targetModal=='edit') {
      // props.asyncUpdatePatient()
      // props.asyncInitData()
      // props.closeModal()
      message.success('Đã sửa')
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