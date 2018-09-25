import * as React from 'react'
import { Modal } from 'antd'

import AddPatientForm, { } from '../form/AddPatientForm'

export const ModalPatient = ({ props }: { props: any }) => {
  return (
    <Modal title='Add New Patient' visible={props.addModal}
      onOk={props.closeAddModal} onCancel={props.closeAddModal}>
      <AddPatientForm />
    </Modal>
  )
}
