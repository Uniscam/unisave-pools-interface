import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink target="_blank" href="https://swap.y3d.finance/#/swap?inputCurrency=0x12e2fcfa079fc23ae82ab82707b402410321103f&outputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56">
        Swap
      </StyledLink>
      <StyledLink  target="_blank" href="https://info.y3d.finance/">
        Info
      </StyledLink>      
      <StyledLink target="_blank" href="https://t.me/y3dScam">
        Telegram
      </StyledLink>
      <StyledLink target="_blank" href="https://github.com/Uniscam/unisave-pools-interface">
        GitHub
      </StyledLink>
      <StyledLink target="_blank" href="https://twitter.com/UnisaveProtocol">
        Twitter
      </StyledLink>
      <StyledLink
        target="_blank"
        href="https://medium.com/y3dscam/introduction-to-unisave-6ca3a85a0693"
      >
        Medium
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.yellow};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.yellow};
  }
`

export default Nav
