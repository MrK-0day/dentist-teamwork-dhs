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
    getPatients {
      fullname
    }
  }
`
