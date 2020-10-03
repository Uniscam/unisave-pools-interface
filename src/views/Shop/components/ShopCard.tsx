import React from 'react'
import styled from 'styled-components'

import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Spacer from '../../../components/Spacer'

export interface ShopCardInfo {
  name: string
  details: Array<string>
  icon?: JSX.Element
  buttonDisabled: boolean
  buttonText: string
  handleClick?: Function
}

export interface ShopCardProps {
  shop: ShopCardInfo
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const handleButtonClick = () => {
    const { handleClick } = shop
    handleClick && handleClick()
  }
  return (
    <StyledCardWrapper>
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>{shop.icon || null}</CardIcon>
            <StyledTitle>{shop.name}</StyledTitle>
            <StyledDetails>
              {shop.details.map((item, i) => (
                <StyledDetail key={`card-detail-${i}`}>{item}</StyledDetail>
              ))}
            </StyledDetails>
            <Spacer />
            <Button
              disabled={shop.buttonDisabled}
              text={shop.buttonText}
              onClick={handleButtonClick}
            />
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[500]};
`

export default ShopCard