import gql from 'graphql-tag'
export const GQL_getRecords = gql`
  {
    getRecords {
      _id recordNumber no cost paid
      patient {
        _id fullname
      }
    }
  }
`

export const GQL_addRecord = gql`
  mutation addRecord($patientId: String!, $recordNumber: String!, $cost: String!, $teeth: String!, $paid: String, $createdDate: Int!, $treatment: String!, $doctorId: String!) {
    addRecord (patientId: $patientId, recordNumber: $recordNumber, cost: $cost, teeth: $teeth, paid: $paid, createdDate: $createdDate, treatment: $treatment, doctorId: $doctorId) {
      _id recordNumber no cost paid
      patient {
        _id fullname
      }
    }
  }
`

export const GQL_removeRecord = gql`
  mutation removeRecord($_id: ID!) {
    removeRecord (_id: $_id) {
      _id
    }
  }
`

export const GQL_getPatient = gql`
  {
    getPatients{
      _id fullname gender dob career address phone nationality email refBy
    }
  }
`

export const GQL_addPatient = gql`
  mutation addPatient ($fullname: String!, $gender: String, $dob: String, $career: String, $address: String, $phone: String!, $nationality: String, $email: String, $refBy: String){
    addPatient (fullname: $fullname, gender: $gender, dob:$dob, career: $career, address: $address, phone: $phone, nationality: $nationality, email: $email, refBy: $refBy){
      _id fullname gender dob career address phone nationality email refBy
    }
  }
`

export const GQL_deletePatient = gql`
  mutation removePatient ($id: ID!) {
    removePatient(_id:$id){
      fullname
    }
  }
`

export const GQL_updatePatient = gql`
  mutation removePatient ($id: ID!) {
    removePatient(_id:$id){
      fullname
    }
  }`