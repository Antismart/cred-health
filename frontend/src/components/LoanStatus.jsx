import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const LoanStatus = () => {
  const { id } = useParams()

  return (
    <StatusContainer>
      <StatusTitle>Loan Status</StatusTitle>
      <p>Check the status of your loan application (ID: {id}).</p>
    </StatusContainer>
  )
}
const StatusContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const StatusTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`


export default LoanStatus