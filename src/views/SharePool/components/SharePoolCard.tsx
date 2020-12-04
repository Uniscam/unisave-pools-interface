import React, { useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled from 'styled-components'
// import { useWallet } from 'use-wallet'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Spacer from '../../../components/Spacer'
import useTotalSupply from '../../../hooks/sharePool/useTotalSupply'
import useDecimals from '../../../hooks/useDecimals'
import { useTokenPriceInBUSD } from '../../../hooks/useTokenPrice'
import { usePoolApy } from '../../../hooks/useFarmApy'
import { isNaN } from 'lodash'
import { useY3dPrice } from '../../../hooks/useY3dPrice'
import { SharePool } from '../../../contexts/SharePools'
import { getBalanceNumber } from '../../../utils/formatBalance'

export interface SharePoolCardProps {
  sharePool: SharePool
}

const SharePoolCard: React.FC<SharePoolCardProps> = ({ sharePool }) => {
  const { poolAddress, stakingTokenAddresses, earnToken, /* earnTokenAddress,*/ pid, name: symbol, icon: poolIcon, id: poolId, magnification, p3d } = sharePool
  // const { account, chainId } = useWallet()
  const stakingTokenAddress = stakingTokenAddresses[0].address
  // const stakingToken = stakingTokenAddresses[0].symbol
  const isLpToken = stakingTokenAddresses[0].isLpToken
  const decimalsOfStaking = useDecimals(stakingTokenAddress)
  // console.log(earnTokenAddress)
  // const decimalsOfEarn = useDecimals(earnTokenAddress)
  const { priceInBUSD: tokenPriceOfStaking } = useTokenPriceInBUSD(stakingTokenAddress, decimalsOfStaking, isLpToken)
  const { priceInUSD: tokenPriceOfEarn } = useY3dPrice()

  const { apy } = usePoolApy(poolAddress, tokenPriceOfEarn.toString(), tokenPriceOfStaking, "18", decimalsOfStaking)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [startTime, setStartTime] = useState(0)
  const [imagePath, setImagePath] = useState('')

  const totalSupply = useTotalSupply(pid)

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  const loadTokenImage = (name: string): void => {
    import(`../../../assets/img/token/${name}.png`).then(path => {
      console.log('SharePoolCard::loadTokenImage path:', path)
      setImagePath(path.default)
    })
  }

  const isPairToken = poolIcon.includes('-')

  useEffect(() => {
    loadTokenImage(poolIcon)
  }, [poolIcon])

  const poolActive = true // startTime * 1000 - Date.now() <= 0

  return (
    <StyledCardWrapper>
      <Card>
        <CardContent>
          <StyledContent>
            <StyledMagnification>{magnification}X</StyledMagnification>
            <StyledCardIcon style={isPairToken ? { height: '40px', marginTop: '30px' } : {}}>
              <StyledIconImage style={isPairToken ? { height: '40px' } : {}} src={imagePath} alt="token-icon" />
            </StyledCardIcon>
            <StyledDetails>
              <StyledDetail>
                <StyledDetailSpan>Deposit</StyledDetailSpan>
                <StyledDetailSpan>
                  {symbol.toUpperCase()}
                </StyledDetailSpan>
              </StyledDetail>
              <StyledDetail>
                <StyledDetailSpan>Earn</StyledDetailSpan>
                <StyledDetailSpan>
                  {earnToken.toUpperCase()}
                </StyledDetailSpan>
              </StyledDetail>
              <StyledDetail>
                <StyledDetailSpan>APY</StyledDetailSpan>
                <StyledDetailSpan>
                  {((typeof apy === 'string' && apy === 'NaN') || isNaN(apy)) ? 0 : apy}%
                </StyledDetailSpan>
              </StyledDetail>
              <StyledDetail>
                <StyledDetailSpan>P3D</StyledDetailSpan>
                <StyledDetailSpan>
                  {((typeof p3d === 'string' && p3d === 'NaN') || isNaN(p3d)) ? 0 : p3d}%
                </StyledDetailSpan>
              </StyledDetail>
            </StyledDetails>
            <Spacer />
            <Button
              disabled={!poolActive}
              text={poolActive ? 'Select' : undefined}
              to={`/sharepool/${poolId}`}
            >
              {!poolActive && (
                <Countdown
                  date={new Date(startTime * 1000)}
                  renderer={renderer}
                />
              )}
            </Button>
            <Spacer />
            <StyledDetails style={{ marginTop: 0 }}>
              <StyledDetail>
                <StyledDetailSpan>Total Staked</StyledDetailSpan>
                <StyledDetailSpan>
                  {getBalanceNumber(totalSupply).toFixed(4)} {symbol.toUpperCase()}
                </StyledDetailSpan>
              </StyledDetail>
            </StyledDetails>
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

const StyledCardIcon = styled.div`
  height: 70px;
  width: auto;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing[3]}px;
`

const StyledIconImage = styled.img`
  height: 70px;
  width: auto;
  display: block;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
`

const StyledDetails = styled.div`
  width: 100%;
  margin-top: ${(props) => props.theme.spacing[2]}px;
`

const StyledDetail = styled.div`
  color: #000000;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`

const StyledDetailSpan = styled.span`
  display: inline-block;
  font-weight: 400;
  &:last-of-type {
    font-weight: 600;
  }
`

const StyledMagnification = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #F7CA2D;
  border-radius: 13px;
  width: 52px;
  height: 24px;
  line-height: 24px;
  color: #000000;
  font-size: 16px;
  text-align: center;
  font-weight: 600;
`

export default SharePoolCard
