import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { SharePool as Pool } from '../../contexts/SharePools'
import useSharePool from '../../hooks/useSharePool'
import { getContract } from '../../utils/erc20'
import PageHeader from './components/PageHeader'
import Spacer from '../../components/Spacer'
import Stake from './components/Stake'
import Harvest from './components/Harvest'
import Button from '../../components/Button'
import WalletProviderModal from '../../components/WalletProviderModal'
import useModal from '../../hooks/useModal'

const SharePool: React.FC = () => {
  const { poolId } = useParams<{ poolId?: string }>()
  const initPool: Pool = {
    pid: 0,
    name: '',
    poolAddress: '',
    stakingTokenAddresses: [],
    earnToken: '',
    earnTokenAddress: '',
    id: '',
    icon: 'y3d',
    p3d: 0,
    magnification: 0
  }
  const { pid, stakingTokenAddresses, earnToken, earnTokenAddress } = useSharePool(poolId) || initPool

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { ethereum, account } = useWallet()
  const earnTokenName = earnToken.toUpperCase()
  const lpPoolInfos = useMemo(() => {
    return stakingTokenAddresses.map(stake => {
      const contract = getContract(ethereum as provider, stake.address)
      const tokenName = stake.symbol.toUpperCase()
      const isWBNB = stake.isWBNB
      return {
        contract,
        tokenName,
        earnTokenName,
        earnTokenAddress,
        isWBNB
      }
    })
  }, [earnTokenAddress, earnTokenName, ethereum, stakingTokenAddresses])
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  return (
    <>
      { account ? (
        <>
          <PageHeader
            title={`Deposit Tokens and earn ${earnTokenName}`}
          />
          <StyledSharePool>
            <StyledCardsWrapper>
              <StyledCardWrapper>
                <Harvest pid={pid} />
              </StyledCardWrapper>
              {lpPoolInfos.map(pool => (
                <StyledCardWrapper key={pool.tokenName}>
                  <Stake
                    pid={pid}
                    lpContract={pool.contract}
                    tokenName={pool.tokenName}
                    isWBNB={pool.isWBNB}
                  />
                </StyledCardWrapper>
              ))}
            </StyledCardsWrapper>
          </StyledSharePool>
          <Spacer size="lg" />
        </>
      ) : (
          <StyledUnlockButtonWrapper>
            <StyledUnlockButton>
              <Button
                onClick={onPresentWalletProviderModal}
                text="🔓 Unlock Wallet"
              />
            </StyledUnlockButton>
          </StyledUnlockButtonWrapper>
        )}
    </>
  )
}

const StyledSharePool = styled.div`
  max-width: 912px;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: ${(props) => props.theme.spacing[4]}px;
  column-gap: ${(props) => props.theme.spacing[4]}px;
  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  width: 288px;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledUnlockButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  height: 80vh;
`

const StyledUnlockButton = styled.div`
  width: 200px;
`

export default SharePool
