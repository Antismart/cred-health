import React from 'react'
import styled from 'styled-components'

const AboutContainer = styled.div`
  padding: ${props => props.theme.spacing.large};
  color: ${props => props.theme.colors.text};
`

const AboutSection = styled.section`
  margin-bottom: ${props => props.theme.spacing.large};
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${props => props.theme.spacing.medium};
  color: ${props => props.theme.colors.primary};
`

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: ${props => props.theme.spacing.medium};
  color: ${props => props.theme.colors.primary};
`

const Paragraph = styled.p`
  margin-bottom: ${props => props.theme.spacing.medium};
  line-height: 1.6;
`

const FundraiserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.medium};
`

const FundraiserCard = styled.div`
  background-color: ${props => props.theme.colors.secondaryBackground};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.medium};
`

const FundraiserTitle = styled.h3`
  margin-bottom: ${props => props.theme.spacing.small};
`

const FundraiserDescription = styled.p`
  font-size: 0.9rem;
  margin-bottom: ${props => props.theme.spacing.small};
`

const FundraiserProgress = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
`

const DonateButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  margin-top: ${props => props.theme.spacing.small};
  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }
`

export default function AboutUs() {
  return (
    <AboutContainer>
      <AboutSection>
        <Title>CrowdHealth: Empowering Community Fundraising</Title>
        <Paragraph>
          CrowdHealth is a platform dedicated to making community fundraising accessible and impactful. We
          believe in the power of collective support to uplift those in need and create positive change.
        </Paragraph>
        <Paragraph>
          Our mission is to provide a secure, user-friendly, and transparent platform for individuals and
          organizations to fundraise for a wide range of causes, from medical expenses to community projects.
          We strive to empower our users to share their stories, connect with supporters, and make a
          meaningful difference.
        </Paragraph>
        <Paragraph>
          At CrowdHealth, we are committed to fostering a community of compassion and collaboration. We believe
          that by working together, we can overcome challenges, support one another, and create a more just and
          equitable world.
        </Paragraph>
      </AboutSection>

      <AboutSection>
        <Subtitle>How It Works</Subtitle>
        <Paragraph>
          Creating a fundraiser on CrowdHealth is simple and straightforward. Share your story, set a
          fundraising goal, and start collecting donations. We handle the secure payment processing and
          provide tools to help you reach your target.
        </Paragraph>
        <Paragraph>
          Our platform is designed to make fundraising accessible to everyone. Whether you're raising
          funds for medical expenses, community projects, or personal needs, we're here to support you
          every step of the way.
        </Paragraph>
        <Paragraph>
          Join the CrowdHealth community and start making a difference today. Together, we can create
          positive change and help those in need.
        </Paragraph>
      </AboutSection>

      <AboutSection>
        <Subtitle>Featured Fundraisers</Subtitle>
        <FundraiserGrid>
          <FundraiserCard>
            <FundraiserTitle>Samantha's Journey to Recovery</FundraiserTitle>
            <FundraiserDescription>Help support Samantha's continued recovery and medical expenses.</FundraiserDescription>
            <FundraiserProgress>
              <span>$12,000 raised</span>
              <span>$20,000 goal</span>
            </FundraiserProgress>
            <DonateButton>Donate</DonateButton>
          </FundraiserCard>
          <FundraiserCard>
            <FundraiserTitle>Rebuilding After the Flood</FundraiserTitle>
            <FundraiserDescription>Help a family to repair their home after a devastating flood.</FundraiserDescription>
            <FundraiserProgress>
              <span>$15,000 raised</span>
              <span>$25,000 goal</span>
            </FundraiserProgress>
            <DonateButton>Donate</DonateButton>
          </FundraiserCard>
        </FundraiserGrid>
      </AboutSection>
    </AboutContainer>
  )
}