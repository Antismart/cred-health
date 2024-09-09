import React from 'react'
import styled from 'styled-components'

const HospitalOnboarding = () => {
  return (
    <OnboardingContainer>
      <OnboardingTitle>Hospital Onboarding</OnboardingTitle>
      <p>Register your hospital with CredHealth.</p>
    </OnboardingContainer>
  )
}

const OnboardingContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const OnboardingTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`


export default HospitalOnboarding