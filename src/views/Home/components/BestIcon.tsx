import React from 'react'
import styled from 'styled-components'
import BestImage from '../../../assets/img/y3d-icon.png'

const BestIcon: React.FC = () => {
  return (
    <StyledImage src={BestImage} alt='y3d-icon' />
  )
}

const StyledImage = styled.img`
  width: 45px;
  height: 45px;
  margin-top: 4px;
  display: inline-block;
`

export default BestIcon
