import * as React from 'react'
import { Modal } from 'antd'

import AddPatientForm, { } from '../form/AddPatientForm'

export const ModalPatient = ({ props }: { props: any }) => {
  return (
    <Modal maskClosable={false} footer={null} title='Add New Patient' visible={props.addModal}
      onOk={props.AddPatient} onCancel={props.closeAddModal}>
      <AddPatientForm />
    </Modal>
  )
}
