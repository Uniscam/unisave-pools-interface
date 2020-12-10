import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'

interface TopBarProps {
  onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  return (
    <StyledTopBar>
      <Container size="lg">
        <StyledTopBarInner>
          <StyledLogoWrapper>
            <Logo />
          </StyledLogoWrapper>
          <StyledNavWrapper>
            <Nav />
          </StyledNavWrapper>
          <StyledAccountButtonWrapper>
            <AccountButton />
          </StyledAccountButtonWrapper>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  )
}

const StyledLogoWrapper = styled.div`
  @media only screen and (max-width: 768px) {
    grid-row: row1;
  }
`

const StyledTopBar = styled.div`
  background-color: rgba(8,8,8,0.25);
`

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  min-height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
  @media only screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: [row1] auto [row2] 32px;
  }
`
const StyledNavWrapper = styled.div`
  @media only screen and (max-width: 768px) {
    grid-row: row2;
    grid-column: 1 / 3;
  }
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 156px;
  @media (max-width: 400px) {
    justify-content: center;
    width: auto;
  }
  @media only screen and (max-width: 768px) {
    grid-row: row1;
  }
`

// const StyledMenuButton = styled.button`
//   background: none;
//   border: 0;
//   margin: 0;
//   outline: 0;
//   padding: 0;
//   display: none;
//   @media (max-width: 400px) {
//     align-items: center;
//     display: flex;
//     height: 44px;
//     justify-content: center;
//     width: 44px;
//   }
// `

export default TopBar
