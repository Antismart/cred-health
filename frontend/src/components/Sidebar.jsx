import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Home, CreditCard, Hospital, Bell, HelpCircle, LogOut } from 'lucide-react'

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarLink to="/patient-dashboard"><Home size={20} /> Dashboard</SidebarLink>
      <SidebarLink to="/loan-request"><CreditCard size={20} /> Request Loan</SidebarLink>
      <SidebarLink to="/credit-score-check"><Hospital size={20} /> Credit Score</SidebarLink>
      <SidebarLink to="#"><Bell size={20} /> Notifications</SidebarLink>
      <SidebarLink to="#"><HelpCircle size={20} /> Help & Support</SidebarLink>
      <SidebarLink to="#"><LogOut size={20} /> Logout</SidebarLink>
    </SidebarContainer>
  )
}



const SidebarContainer = styled.aside`
  width: 250px;
  background: ${({ theme }) => theme.cardBg};
  padding: 2rem 1rem;
`

const SidebarLink = styled(Link)`
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

export default Sidebar