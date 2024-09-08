import React, { useState } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Moon, Sun, Hospital, CreditCard, Shield, Home, User, Bell, HelpCircle, LogOut } from 'lucide-react'

const lightTheme = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#f0f2f5',
  text: '#2c3e50',
  cardBg: '#ffffff',
}

const darkTheme = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#2c3e50',
  text: '#ecf0f1',
  cardBg: '#34495e',
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }
`

function Header({ toggleTheme, isDarkTheme }) {
  return (
    <HeaderContainer>
      <Logo>CredHealth</Logo>
      <Nav>
        <NavLink href="#home">Home</NavLink>
        <NavLink href="#features">Features</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </Nav>
      <ThemeToggle onClick={toggleTheme}>
        {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
      </ThemeToggle>
    </HeaderContainer>
  )
}

function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarLink><Home size={20} /> Dashboard</SidebarLink>
      <SidebarLink><CreditCard size={20} /> Loans</SidebarLink>
      <SidebarLink><Shield size={20} /> Credit Score</SidebarLink>
      <SidebarLink><Bell size={20} /> Notifications</SidebarLink>
      <SidebarLink><HelpCircle size={20} /> Help & Support</SidebarLink>
      <SidebarLink><LogOut size={20} /> Logout</SidebarLink>
    </SidebarContainer>
  )
}

function HomePage() {
  return (
    <HomePageContainer>
      <HeroSection>
        <HeroTitle>Welcome to CredHealth</HeroTitle>
        <HeroSubtitle>Empowering Healthcare Through Innovative Financing</HeroSubtitle>
        <CTAContainer>
          <CTAButton>For Patients</CTAButton>
          <CTAButton>For Hospitals</CTAButton>
        </CTAContainer>
      </HeroSection>
      <FeaturedSection>
        <SectionTitle>Featured Hospitals</SectionTitle>
        <FeaturedHospitals>
          <HospitalCard>
            <HospitalName>City General Hospital</HospitalName>
            <HospitalDescription>Leading healthcare provider in the heart of the city.</HospitalDescription>
          </HospitalCard>
          <HospitalCard>
            <HospitalName>Sunshine Medical Center</HospitalName>
            <HospitalDescription>Specialized care with a focus on patient comfort.</HospitalDescription>
          </HospitalCard>
          <HospitalCard>
            <HospitalName>Greenvalley Clinic</HospitalName>
            <HospitalDescription>Affordable healthcare solutions for all.</HospitalDescription>
          </HospitalCard>
        </FeaturedHospitals>
      </FeaturedSection>
    </HomePageContainer>
  )
}

function PatientDashboard() {
  return (
    <DashboardContainer>
      <DashboardHeader>
        <h2>Patient Dashboard</h2>
        <UserInfo>
          <Avatar src="/placeholder.svg" alt="User Avatar" />
          <UserName>John Doe</UserName>
        </UserInfo>
      </DashboardHeader>
      <DashboardContent>
        <DashboardCard>
          <CardTitle>Current Loans</CardTitle>
          <LoanList>
            <LoanItem>
              <LoanName>Hospital Bill Loan</LoanName>
              <LoanAmount>$5,000</LoanAmount>
              <LoanStatus status="active">Active</LoanStatus>
            </LoanItem>
            <LoanItem>
              <LoanName>Medical Equipment Loan</LoanName>
              <LoanAmount>$2,000</LoanAmount>
              <LoanStatus status="paid">Paid</LoanStatus>
            </LoanItem>
          </LoanList>
        </DashboardCard>
        <DashboardCard>
          <CardTitle>Credit Score</CardTitle>
          <CreditScoreDisplay>
            <CreditScore>720</CreditScore>
            <CreditScoreLabel>Excellent</CreditScoreLabel>
          </CreditScoreDisplay>
        </DashboardCard>
      </DashboardContent>
      <CTAButton>Request New Loan</CTAButton>
    </DashboardContainer>
  )
}

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>CredHealth</FooterTitle>
          <FooterText>&copy; 2023 CredHealth. All rights reserved.</FooterText>
        </FooterSection>
        <FooterSection>
          <FooterLink href="#privacy">Privacy Policy</FooterLink>
          <FooterLink href="#terms">Terms of Service</FooterLink>
          <FooterLink href="#contact">Contact Us</FooterLink>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  )
}

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AppContainer>
        <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
        <MainContent>
          <Sidebar />
          <PageContent>
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'dashboard' && <PatientDashboard />}
          </PageContent>
        </MainContent>
        <Footer />
      </AppContainer>
    </ThemeProvider>
  )
}

// Styled components
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContent = styled.main`
  display: flex;
  flex: 1;
`

const PageContent = styled.div`
  flex: 1;
  padding: 2rem;
`

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.cardBg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`

const NavLink = styled.a`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
`

const SidebarContainer = styled.aside`
  width: 250px;
  background: ${({ theme }) => theme.cardBg};
  padding: 2rem 1rem;
`

const SidebarLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
`

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.secondary} 100%);
  color: white;
  border-radius: 8px;
`

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto 2rem;
`

const CTAContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`

const CTAButton = styled.button`
  background-color: white;
  color: ${({ theme }) => theme.primary};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

const FeaturedSection = styled.section`
  padding: 2rem;
`

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`

const FeaturedHospitals = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`

const HospitalCard = styled.div`
  background-color: ${({ theme }) => theme.cardBg};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const HospitalName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`

const HospitalDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
`

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

const UserName = styled.span`
  font-weight: bold;
`

const DashboardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`

const DashboardCard = styled.div`
  background-color: ${({ theme }) => theme.cardBg};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`

const LoanList = styled.ul`
  list-style: none;
  padding: 0;
`

const LoanItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.background};

  &:last-child {
    border-bottom: none;
  }
`

const LoanName = styled.span`
  font-weight: 500;
`

const LoanAmount = styled.span`
  color: ${({ theme }) => theme.primary};
`

const LoanStatus = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: ${({ status, theme }) =>
    status === 'active' ? theme.primary : status === 'paid' ? theme.secondary : theme.background};
  color: white;
`

const CreditScoreDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CreditScore = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`

const CreditScoreLabel = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
`

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
`

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`

const FooterText = styled.p`
  font-size: 0.9rem;
`

const FooterLink = styled.a`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`