import React, { useEffect } from 'react'
import styled from 'styled-components'
import theme from '../../theme'
import { VestNFTList } from '../../constants/vestNFTs'

import Page from '../../components/Page'
import NFTCard from '../../components/NFTCard'

import "./index.css"

const Referral: React.FC = () => {
  useEffect(() => {

  })

  function CardList(props: any): any {
    return VestNFTList.map((item, index) => {
      return (
        <NFTCard info={item} key={index} />
      )
    })
  }

  return (
    <Page>
      <StyledReferralBox>
        <span style={nftTitleStyle}>Vest NFT</span>
        <div style={commonDivStyle}>
          <CardList />
        </div>
      </StyledReferralBox>
    </Page>
  )
}

const StyledReferralBox = styled.div`
  width: 100%;
`

const commonDivStyle = {
  width: "auto",
  maxWidth: "1160px",
  margin: "20px auto 0",
  display: "grid",
  padding: "0 20px",
  gridTemplateColumns: "repeat(auto-fill,minmax(272px,1fr))",
  gridGap: "25px 24px"
}

const nftTitleStyle = {
  marginTop: "30px",
  fontSize: "30px",
  textAlign: "center" as const,
  display: "block",
  color: theme.color.yellow
}

export default Referral
