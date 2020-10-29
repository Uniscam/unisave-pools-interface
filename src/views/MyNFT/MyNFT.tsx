import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import theme from '../../theme'
// import web3 from '../../web3/'
import useFetchMetadata, {
  TokenItem,
  VestMetadata,
} from '../../hooks/nft/useFetchMetadata'
import useRefReward from '../../hooks/useNFTReward'
import useMyNFT from '../../hooks/useMyNFT'
import { VestNFTList, NftAssets } from '../../constants/vestNFTs'
import { queryParse, setQuery } from "../../utils/router"

import Page from '../../components/Page'
import NFTCard from '../../components/NFTCard'
// import AcceleratorABI from '../../constants/abi/StakingRewardAccelerator.json'
// import { ACC } from '../../constants/acc'

import "./index.css"

interface MetadataWithStatus extends VestMetadata {
  rewardStatus: boolean
  tokenId: number
  claimId: number
  balance: number
  staked: boolean
  acc: number
}

const tokenList: Array<TokenItem> = [
  {
    tokenId: 1,
  },
  {
    tokenId: 2,
  },
  {
    tokenId: 3,
  },
  {
    tokenId: 4,
  },
  {
    tokenId: 5
  }
]

const findAssetsByType = (
  name: string,
  metadataList: Array<VestMetadata>,
  rewardStatus: Array<boolean>,
  tokenList: Array<TokenItem>,
  balance: Array<any>
  // NFTId: string
): Array<MetadataWithStatus> => {
  console.log('选择的 name 是', name)
  const metadataWithStatus = metadataList.map((data, i) => {
    let resBody = {
      ...data,
      rewardStatus: rewardStatus[i],
      tokenId: tokenList[i].tokenId,
      claimId: i,
      balance: Number(balance[i]),
      staked: false,
      acc: 0
    }
    // if (parseInt(NFTId) === resBody.tokenId) resBody.staked = true
    if (resBody.tokenId === 1) resBody.acc = 200
    if (resBody.tokenId === 2) resBody.acc = 200
    if (resBody.tokenId === 3) resBody.acc = 200
    if (resBody.tokenId === 4) resBody.acc = 200
    if (resBody.tokenId === 5) resBody.acc = 200

    return resBody
  })

  const pendingRewards = metadataWithStatus.filter(
    (item) => item.rewardStatus === true,
  )
  const receivedRewards = metadataWithStatus.filter(
    (item) => item.balance > 0,
  )
  const stakedRewards = metadataWithStatus.filter(
    (item) => item.staked === true,
  )

  let list: Array<MetadataWithStatus> = []

  switch (name) {
    case "pending":
      list = pendingRewards
      break
    case "recieved":
      list = receivedRewards
      break
    case "staked":
      list = stakedRewards
      break
    default:
      list = []
      break
  }

  return list
}

const Referral: React.FC = () => {
  const { nav: queryNav } = queryParse()
  const [nav, setNav] = useState(queryNav || 'pending')
  const { rewardStatus } = useRefReward()
  const { metadataList } = useFetchMetadata(tokenList)
  const { NFTBalance } = useMyNFT()

  let selectedList: any = []

  const handleNavChange = useCallback(
    async (nav: string) => {
      // const accelerator = new web3.eth.Contract(AcceleratorABI as any, ACC)
      // @ts-ignore
      // const NFTId = await accelerator.methods.getStaked(account).call()
      // const list = findAssetsByType(name, metadataList, rewardStatus, tokenList, NFTBalance, NFTId)
      const list = findAssetsByType(nav, metadataList, rewardStatus, tokenList, NFTBalance)
      console.log(list)
      selectedList = list
    },
    [ NFTBalance, metadataList, rewardStatus ]
  )

  function CardList(props: any): any {
    const { onChange } = props
    onChange(queryNav)
    console.log(selectedList)
    return (
      <div className="mynft-list">
        {
          // @ts-ignore
          selectedList.map((item, index) => {
            return (
              // @ts-ignore
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
        <p className={nav === 'pending' && 'mynft-nav-active' || undefined} onClick={(e) => setQueryNav('pending')}>
          Pending
        </p>
        <p className={nav === 'recieved' && 'mynft-nav-active' || undefined} onClick={(e) => setQueryNav('recieved')}>
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
          <CardList onChange={handleNavChange} />
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
