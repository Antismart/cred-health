import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import Navigation from './components/Navigation'
import AboutUs  from './components/AboutUs'
import theme from './theme'
import './App.css'

const AppContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-height: 100vh;
  font-family: ${props => props.theme.fonts.main};
`

const ContentContainer = styled.div`
  padding: ${props => props.theme.spacing.large};
`

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.large};
`

const CampaignGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.large};
`

const CampaignCard = styled.div`
  background-color: ${props => props.theme.colors.secondaryBackground};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.large};
`

const CampaignTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.small};
`

const CampaignDescription = styled.p`
  color: ${props => props.theme.colors.secondaryText};
  margin-bottom: ${props => props.theme.spacing.small};
`

const ProgressBar = styled.div`
  background-color: ${props => props.theme.colors.progressBackground};
  border-radius: ${props => props.theme.borderRadius.small};
  height: 8px;
  margin-bottom: ${props => props.theme.spacing.small};
  overflow: hidden;
`

const Progress = styled.div`
  background-color: ${props => props.theme.colors.primary};
  height: 100%;
  width: ${props => props.width};
`

const CampaignInfo = styled.div`
  color: ${props => props.theme.colors.secondaryText};
  font-size: 0.9em;
`

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContainer>
          <Navigation />

          <ContentContainer>
            <Routes>
              <Route path="/" element={
                <>
                  <SectionTitle>Active Campaigns</SectionTitle>
                  <CampaignGrid>
                    <CampaignCard>
                      <CampaignTitle>Cancer Treatment for Sarah</CampaignTitle>
                      <CampaignDescription>Help Sarah afford life-saving cancer treatment</CampaignDescription>
                      <ProgressBar><Progress width="75%" /></ProgressBar>
                      <CampaignInfo>75% funded, 14 days remaining</CampaignInfo>
                    </CampaignCard>
                    <CampaignCard>
                      <CampaignTitle>Wheelchair for Michael</CampaignTitle>
                      <CampaignDescription>Help Michael get the mobility he needs</CampaignDescription>
                      <ProgressBar><Progress width="60%" /></ProgressBar>
                      <CampaignInfo>60% funded, 21 days remaining</CampaignInfo>
                    </CampaignCard>
                    <CampaignCard>
                      <CampaignTitle>Prosthetic Leg for Emily</CampaignTitle>
                      <CampaignDescription>Help Emily regain her mobility</CampaignDescription>
                      <ProgressBar><Progress width="38%" /></ProgressBar>
                      <CampaignInfo>38% funded, 7 days remaining</CampaignInfo>
                    </CampaignCard>
                  </CampaignGrid>

                  <SectionTitle>Top Campaigns</SectionTitle>
                  <CampaignGrid>
                    <CampaignCard>
                      <CampaignTitle>Life-Saving Surgery for John</CampaignTitle>
                      <CampaignDescription>Help John get the surgery he needs to survive</CampaignDescription>
                      <ProgressBar><Progress width="100%" /></ProgressBar>
                      <CampaignInfo>100% funded, Campaign Ended</CampaignInfo>
                    </CampaignCard>
                    <CampaignCard>
                      <CampaignTitle>Mobility Assistance for Lisa</CampaignTitle>
                      <CampaignDescription>Help Lisa regain her independence with a new wheelchair</CampaignDescription>
                      <ProgressBar><Progress width="100%" /></ProgressBar>
                      <CampaignInfo>100% funded, Campaign Ended</CampaignInfo>
                    </CampaignCard>
                  </CampaignGrid>
                </>
              } />
              <Route path="/about-us" element={<AboutUs />} />
            </Routes>
          </ContentContainer>
        </AppContainer>
      </Router>
    </ThemeProvider>
  )
}