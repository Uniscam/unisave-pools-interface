import { utils } from 'ethers'
import { getPairContract } from './pair'
import { provider } from 'web3-core'
// import { useWallet } from 'use-wallet'
import { getSwapRouter } from '../utils/swapRouter'
// import { address } from '../constants/swap'
import BigNumber from 'bignumber.js'
import { ROUTER02_ADDRESS } from '../constants/tokenAddresses'
// import { useCallback, useEffect, useMemo, useState } from 'react'
// import { BUSD_ADDRESS } from '../constants/tokenAddresses'

async function getPriceOf(swapRouter: any,amount: string, token:string, valuationCurrency: string) {
  let token0Price = '0'
  if (token.toLowerCase() === valuationCurrency.toLowerCase()) {
    token0Price = amount
  } else {
    try {
      ;[, token0Price] = await swapRouter.methods
        .getAmountsOut(utils.parseUnits('1', 18), [
          token, // the token address
          valuationCurrency,
        ])
        .call()
    } catch (error) {
      token0Price = '0'
    }
  }
  return token0Price
}

export async function getTotalLiquidity(
  ethereum: provider,
  tokenAddress: string,
  valuationCurrency: string,
  chainId: number = 56
) {
  // @XXX: need rewrite for Unisave
  const networkId = chainId // BSC
  const swapRouter = getSwapRouter(ethereum as provider, ROUTER02_ADDRESS[networkId])
  // LP 做特殊处理
  const pairContract = getPairContract(ethereum, tokenAddress)
  // rewardRate = reward for every second staking
  const {
    _reserve0,
    _reserve1,
  } = await pairContract.methods.getReserves().call()
  const { _deposited0, _deposited1 } = await pairContract.methods.getDeposited().call()
  const { _dummy0, _dummy1 } = await pairContract.methods.getDummy().call()
  const reserve0 = new BigNumber(_reserve0).minus(_dummy0).plus(_deposited0).toString()
  const reserve1 = new BigNumber(_reserve1).minus(_dummy1).plus(_deposited1).toString()
  const _token0 = await pairContract.methods.token0().call()
  const totalSupply = await pairContract.methods.totalSupply().call()
  const _token1 = await pairContract.methods.token1().call()
  let token0Price = await getPriceOf(swapRouter, utils.parseUnits('1', 18).toString(), _token0, valuationCurrency)
  let token1Price = await getPriceOf(swapRouter, utils.parseUnits('1', 18).toString(), _token1, valuationCurrency)
  // if (_token0 === valuationCurrency) {

  // } else {
  //   try {
  //     ;[, token0Price] = await swapRouter.methods
  //       .getAmountsOut(, [
  //         _token0, // the token address
  //         valuationCurrency,
  //       ])
  //       .call()
  //   } catch (error) {
  //     token0Price = '0'
  //   }
  // }

  // try {
  //   ;[, token1Price] = await swapRouter.methods
  //     .getAmountsOut(utils.parseUnits('1', 18), [
  //       _token1, // the token address
  //       valuationCurrency,
  //     ])
  //     .call()
  // } catch (error) {
  //   token1Price = '0'
  // }
  const token0Total = new BigNumber(token0Price)
    .multipliedBy(2)
    .multipliedBy(utils.formatUnits(reserve0, 18))
    .div(totalSupply)
  const token1Ttotal = new BigNumber(token1Price)
    .multipliedBy(2)
    .multipliedBy(utils.formatUnits(reserve1, 18))
    .div(totalSupply)
  console.log(`for ${tokenAddress}, token0Price: ${token0Price}, token1Price: ${token1Price}`)
  let result: BigNumber
    if (token0Price !== '0' && token1Price !== '0') {
      const token0Value = new BigNumber(reserve0).multipliedBy(utils.formatUnits(token0Price, 18))
      const token1Value = new BigNumber(reserve1).multipliedBy(utils.formatUnits(token1Price, 18))
      // const isToken0ExpensiveThan1 = new BigNumber(token0Price).lt(token1Price)
      // result = isToken0ExpensiveThan1 ? token0Total : token1Ttotal
      console.log(`for ${tokenAddress}, the token0Value: ${token0Value}, token1Value: ${token1Value}`)
      result = token0Value.plus(token1Value).div(totalSupply);
    } else if (token0Price !== '0') {
      result = token0Total
    } else if (token1Price !== '0') {
      result = token1Ttotal
    } else {
      result = new BigNumber(0)
    }
    const fresult = utils.parseUnits(result.toFixed(18), 18).toString()
    console.log(`result for ${tokenAddress} is ${fresult}`)
    return fresult
}

// export function useTotalLiquidity(
//   ethereum: provider,
//   tokenAddress: string
// ) {
//   const [ prices, updatePrices ] = useState({
//     token0: '0',
//     token1: '0'
//   })
//   const [ reserves, updateReserves ] = useState({
//     token0: new BigNumber(0),
//     token1: new BigNumber(0)
//   })

//   const update = useCallback(async () => {
//     const { token0Price, token1Price, token0Total, token1Ttotal } = await getTotalLiquidity(ethereum, tokenAddress, BUSD_ADDRESS)
//     updatePrices({ 
//       token0: token0Price,
//       token1: token1Price,
//     })
//     updateReserves({
//       token0: token0Total, 
//       token1: token1Ttotal
//     })
//   }, [ethereum, tokenAddress])

//   useEffect(() => {
//     if (tokenAddress) {
//       update()
//     }
//   }, [ethereum, tokenAddress, update])

//   const result = useMemo(() => {
//     let result: BigNumber
//     if (prices.token0 !== '0' && prices.token1 !== '0') {
//       const isToken0ExpensiveThan1 = new BigNumber(prices.token0).lt(prices.token1)
//       result = isToken0ExpensiveThan1 ? reserves.token0 : reserves.token1
//     } else if (prices.token0 !== '0') {
//       result = reserves.token0
//     } else if (prices.token0 !== '0') {
//       result = reserves.token1
//     } else {
//       result = new BigNumber(0)
//     }
//     const fresult = utils.parseUnits(result.toFixed(18), 18).toString()
//     return fresult
//   }, [ prices, reserves ])

//   return result
// }
