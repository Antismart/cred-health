import React from 'react'
import styled from 'styled-components'


const LoanRequestForm = () => {
  return (
    <FormContainer>
      <FormTitle>Request a Loan</FormTitle>
      <p>Fill out the form to request a medical loan.</p>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const FormTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`


export default LoanRequestForm