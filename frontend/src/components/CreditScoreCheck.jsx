import React from 'react'
import styled from 'styled-components'

const CreditScoreCheck = () => {
  return (
    <CreditScoreContainer>
      <CreditScoreTitle>Credit Score Check</CreditScoreTitle>
      <p>View your current credit score and history.</p>
    </CreditScoreContainer>
  )
}
const CreditScoreContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const CreditScoreTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`


export default CreditScoreCheck