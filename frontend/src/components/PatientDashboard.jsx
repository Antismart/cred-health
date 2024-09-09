import React from 'react'
import styled from 'styled-components'

const PatientDashboard = () => {
    return (
      <DashboardContainer>
        <DashboardTitle>Patient Dashboard</DashboardTitle>
        <p>View your loans and credit score here.</p>
      </DashboardContainer>
    )
}

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const DashboardTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`



export default PatientDashboard