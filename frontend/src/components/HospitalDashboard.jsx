import React from 'react'
import styled from 'styled-components'

const HospitalDashboard = () => {
  return (
    <DashboardContainer>
      <DashboardTitle>Hospital Dashboard</DashboardTitle>
      <p>Manage patient loans and view performance metrics.</p>
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


export default HospitalDashboard