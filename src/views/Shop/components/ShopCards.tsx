// import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'

import Loader from '../../../components/Loader'
// import { Farm } from '../../../contexts/Farms'
// import useAllStakedValue, {
//   StakedValue,
// } from '../../../hooks/useAllStakedValue'
// import useFarms from '../../../hooks/useFarms'
import ShopCard, { ShopCardInfo } from './ShopCard'
import useClaim from '../../../hooks/nft/useClaim'

const ShopCards: React.FC = () => {

  const { onClaim } = useClaim()

  const exampleShopList: Array<ShopCardInfo> = [
    {
      name: 'NFT',
      details: ['Claim 1 NFT'],
      icon: <span role="img" aria-label="icon">📦</span>,
      buttonDisabled: false,
      buttonText: 'Claim',
      handleClick: onClaim
    },
    {
      name: 'NFT',
      details: ['Claim NFT'],
      icon: <span role="img" aria-label="icon">📦</span>,
      buttonDisabled: true,
      buttonText: 'Claim',
      handleClick: () => {}
    },
    {
      name: 'NFT',
      details: ['Claim NFT'],
      icon: <span role="img" aria-label="icon">📦</span>,
      buttonDisabled: true,
      buttonText: 'Claim',
      handleClick: () => {}
    }
  ]

  const rows = exampleShopList.reduce<Array<Array<ShopCardInfo>>>(
    (cardRows, card, i) => {
      const newCardRows = [...cardRows]
      if (newCardRows[newCardRows.length - 1].length === 3) {
        newCardRows.push([card])
      } else {
        newCardRows[newCardRows.length - 1].push(card)
      }
      return newCardRows
    },
    [[]],
  )

  return (
    <StyledCards>
      {!!rows[0].length ? (
        rows.map((cardRow, i) => (
          <StyledRow key={`row-${i}`}>
            {cardRow.map((card, j) => (
              <React.Fragment key={`card=${j}`}>
                <ShopCard shop={card} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      ) : (
        <StyledLoadingWrapper>
          <Loader text="Cooking the rice ..." />
        </StyledLoadingWrapper>
      )}
    </StyledCards>
  )
}

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

export default ShopCards
