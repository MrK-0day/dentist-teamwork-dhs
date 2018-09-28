import gql from 'graphql-tag'
export const GQL_getRecords = gql`
  {
    getRecords {
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