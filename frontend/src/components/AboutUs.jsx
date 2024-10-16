import React from 'react'
import styled from 'styled-components'
import backgroundImage from "../../assets/landing2.png";

const AboutContainer = styled.div`
  padding: ${props => props.theme.spacing.large};
  color: ${props => props.theme.colors.text};
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  min-height: 100vh;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 105, 180, 0.7),
      rgba(255, 165, 0, 0.7),
      rgba(100, 149, 237, 0.7)
    );
    z-index: 1;
  }
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
`

const AboutSection = styled.section`
  margin-bottom: ${props => props.theme.spacing.large};
  padding: ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius.large};
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${props => props.theme.spacing.medium};
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: ${props => props.theme.spacing.medium};
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`

const Paragraph = styled.p`
  margin-bottom: ${props => props.theme.spacing.medium};
  line-height: 1.6;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`

const FundraiserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.medium};
`

const FundraiserCard = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.medium};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`

const FundraiserTitle = styled.h3`
  margin-bottom: ${props => props.theme.spacing.small};
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`

const FundraiserDescription = styled.p`
  font-size: 0.9rem;
  margin-bottom: ${props => props.theme.spacing.small};
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`

const FundraiserProgress = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`

const DonateButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  margin-top: ${props => props.theme.spacing.small};
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-weight: bold;

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
    transform: translateY(-2px);
  }
`

export default function AboutUs() {
  return (
    <AboutContainer>
      <ContentWrapper>
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
              <FundraiserTitle> Wheel Chair Fundraising for Kigogo</FundraiserTitle>
              <FundraiserDescription>Help Kigogo wheel again!</FundraiserDescription>
              <FundraiserProgress>
                <span>$15,000 raised</span>
                <span>$25,000 goal</span>
              </FundraiserProgress>
              <DonateButton>Donate</DonateButton>
            </FundraiserCard>
          </FundraiserGrid>
        </AboutSection>
      </ContentWrapper>
    </AboutContainer>
  )
}