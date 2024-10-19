import React from 'react'
import styled from 'styled-components'

const AboutContainer = styled.div`
  padding: ${props => props.theme.spacing.large};
  color: white;
  position: relative;
  min-height: 100vh;
  margin: 0;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const AboutSection = styled.section`
  margin-bottom: ${props => props.theme.spacing.large};
  padding: ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius.large};
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${props => props.theme.spacing.medium};
  color: #d3d0ff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: ${props => props.theme.spacing.small};
  color: white;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const FundraiserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.medium};
`;

const FundraiserCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.medium};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FundraiserTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.small};
  color: white;
`;

const FundraiserDescription = styled.p`
  font-size: 0.9rem;
  margin-bottom: ${props => props.theme.spacing.small};
`;

const FundraiserProgress = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.small};
  font-size: 0.8rem;
`;

const DonateButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

export default function AboutUs() {
  return (
    <AboutContainer>
      <ContentWrapper>
        <AboutSection>
          <Title>About CrowdHealth</Title>
          <Paragraph>
            CrowdHealth is a revolutionary platform that leverages blockchain technology to connect patients
            in need with generous donors worldwide. Our mission is to make healthcare accessible to everyone,
            regardless of their financial situation.
          </Paragraph>
        </AboutSection>

        <AboutSection>
          <Subtitle>Our Vision</Subtitle>
          <Paragraph>
            We envision a world where no one has to struggle alone with medical expenses. By creating a
            transparent and secure platform, we aim to build a global community of support, where every
            contribution, no matter how small, can make a significant impact on someone's life.
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
              <FundraiserTitle>Wheel Chair Fundraising for Kigogo</FundraiserTitle>
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
