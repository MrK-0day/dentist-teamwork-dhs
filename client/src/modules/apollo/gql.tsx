import gql from 'graphql-tag'
export const GQL_getRecords = gql`
  {
    getRecords {
      _id recordNumber no cost paid teeth createdDate
      patient {
        _id fullname
      }
    }
  }
`

export const GQL_addRecord = gql`
  mutation addRecord($patientId: String!, $recordNumber: String!, $cost: String!, $teeth: String!, $paid: String, $createdDate: Int!, $treatment: String!, $doctorId: String!) {
    addRecord (patientId: $patientId, recordNumber: $recordNumber, cost: $cost, teeth: $teeth, paid: $paid, createdDate: $createdDate, treatment: $treatment, doctorId: $doctorId) {
      _id recordNumber no cost paid teeth createdDate
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

export const GQL_getRecordById = gql`
  query getRecordById($_id: ID!) {
    record (_id: $_id) {
      _id patientId recordNumber
      no teeth cost paid createdDate
      treatment doctorId isEnabled
      doctor {
        _id fullname
      }
      patient {
        _id fullname
      }
      steps {
        _id
      }
    }
  }
`

export const GQl_editRecord = gql`
  mutation updateRecord($_id: ID!, $patientId: String!, $recordNumber: String!, $cost: String!, $no: Int!, $teeth: String!, $paid: String, $createdDate: Int!, $treatment: String!, $doctorId: String!) {
    updateRecord (_id: $_id, patientId: $patientId, recordNumber: $recordNumber, cost: $cost, no: $no, teeth: $teeth, paid: $paid, createdDate: $createdDate, treatment: $treatment, doctorId: $doctorId) {
      _id no recordNumber treatment cost paid patientId createdDate
      patient {
        fullname
      }
    }
  }
`

export const GQL_getSchedules = gql`
  {
    getSchedules {
      _id timestamp content
      doctor {
        _id fullname
      }
      patient {
        _id fullname
      }
      room {
        _id code name
      }
      step {
        _id
      }
    }
  }
`

export const GQL_getPatient = gql`
  {
    getPatients{
      _id fullname gender dob career address phone nationality email refBy isEnabled medicalHistory
    }
  }
`

export const GQL_getPatientById = gql`
  query GetPatientById($_id: ID!) {
    patient(_id: $_id){
      _id fullname gender dob career address phone nationality email refBy isEnabled medicalHistory
    }
  }
`

export const GQL_addPatient = gql`
  mutation addPatient ($fullname: String!, $gender: String, $dob: String, $career: String, $address: String, $phone: String!, $nationality: String, $email: String, $refBy: String, $medicalHistory: [String]){
    addPatient (fullname: $fullname, gender: $gender, dob:$dob, career: $career, address: $address, phone: $phone, nationality: $nationality, email: $email, refBy: $refBy, medicalHistory: $medicalHistory){
      _id fullname gender dob career address phone nationality email refBy
    }
  }
`

export const GQL_removePatient = gql`
  mutation removePatient ($_id: ID!) {
    removePatient(_id:$_id){
      _id fullname gender dob career address phone nationality email refBy
    }
  }
`

export const GQL_updatePatient = gql`
  mutation updatePatient ($_id: ID!,$fullname: String!, $gender: String, $dob: String, $career: String, $address: String, $phone: String!, $nationality: String, $email: String, $refBy: String, $medicalHistory: [String]){
    updatePatient (_id: $_id,fullname: $fullname, gender: $gender, dob:$dob, career: $career, address: $address, phone: $phone, nationality: $nationality, email: $email, refBy: $refBy, medicalHistory: $medicalHistory){
      _id fullname gender dob career address phone nationality email refBy
    }
  }
`

export const GQL_getDoctor = gql`
  {
    getDoctors{
      _id fullname gender dob specialize address phone nationality email refBy username isEnabled
    }
  }
`

export const GQL_addDoctor = gql`
  mutation addPatient ($fullname: String!, $gender: String, $dob: String, $career: String, $address: String, $phone: String!, $nationality: String, $email: String, $refBy: String){
    addPatient (fullname: $fullname, gender: $gender, dob:$dob, career: $career, address: $address, phone: $phone, nationality: $nationality, email: $email, refBy: $refBy){
      _id fullname gender dob career address phone nationality email refBy
    }
  }
`

export const GQL_removeDoctor = gql`
  mutation removePatient ($_id: ID!) {
    removePatient(_id:$_id){
      _id fullname gender dob career address phone nationality email refBy
    }
  }
`