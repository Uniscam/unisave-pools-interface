import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import theme from '../../theme'
import { VestNFTList, NftAssets } from '../../constants/vestNFTs'
import { useLocation } from "react-router-dom"
import { queryParse, setQuery } from "../../utils/router"

import Page from '../../components/Page'
import NFTCard from '../../components/NFTCard'

import "./index.css"

const Referral: React.FC = () => {
  const { nav: queryNav } = queryParse()
  const [nav, setNav] = useState(queryNav || 'pending')
  const [myNfts, setMyNfts] = useState<NftAssets[]>([])
  useEffect(() => {
    const post = nav === 'pending' ? [0, 5] : [5, 8]
    setMyNfts(VestNFTList.slice(...post))
  }, [nav])

  function CardList(props: any): any {
    return (
      <div className="mynft-list">
        {
          myNfts.map((item, index) => {
            return (
              <NFTCard info={item} key={index} />
            )
          })
        }
      </div>
    )
  }

  function setQueryNav(value: string) {
    setNav(value)
    setQuery('nav', value)
  }

  function Nav(): any {
    return (
      <div className="mynft-nav">
        <p className={nav === 'pending' && 'mynft-nav-active'} onClick={() => setQueryNav('pending')}>
          Pending
        </p>
        <p className={nav === 'recieved' && 'mynft-nav-active'} onClick={() => setQueryNav('recieved')}>
          Recieved
        </p>
      </div>
    )
  }

  return (
    <Page>
      <StyledReferralBox>
        <span style={nftTitleStyle}>My NFT</span>
        <div style={commonDivStyle}>
          <Nav />
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
  padding: "0 20px"
}

const nftTitleStyle = {
  marginTop: "30px",
  fontSize: "30px",
  textAlign: "center" as const,
  display: "block",
  color: theme.color.yellow
}

export default Referral
