import { useCallback, useEffect, useMemo, useState } from 'react'
import { provider } from 'web3-core'
import { utils } from 'ethers'
import { useWallet } from 'use-wallet'
import { getSwapRouter } from '../utils/swapRouter'
import {
  ADDRESS_ZERO,
  WBNB_ADDRESS,
  BUSD_ADDRESS,
  ROUTER02_ADDRESS,
} from '../constants/tokenAddresses'
import { getTotalLiquidity } from '../utils/Liquidity'
// import { BigNumber } from '../sushi';

// const { BigNumber } = utils

/**
 * useTokenPriceInBNB 获取1个单位的代币在 Swap 合约中的价格（以BNB计价）
 * @param tokenAddress Address of ERC20/BEP20 Token
 * @param decimals Token decimals, optional, default is 18. Needs to fill if decimals is not 18
 */
export function useTokenPriceInBNB(
  tokenAddress: string,
  decimals: number | string = 18,
) {
  const { account, ethereum, chainId } = useWallet()
  // use BigNumber, format them at the display part please
  const [priceInBNB, updatePriceInBNB] = useState('0')
  // 97 stands for bsc testnet
  const networkId = chainId
  const contract = useMemo(() => {
    return getSwapRouter(ethereum as provider, ROUTER02_ADDRESS[networkId])
  }, [ethereum, networkId])

  const oneUnitOfToken = utils.parseUnits('1', decimals)

  const fetchPrice = useCallback(async () => {
    if (tokenAddress === ADDRESS_ZERO) {
      // 零号地址，当 BNB 处理，1 BNB = 1 BNB 没毛病
      updatePriceInBNB(oneUnitOfToken.toString())
      return
    }
    try {
      const [, outputWBNB] = await contract.methods
        .getAmountsOut(oneUnitOfToken, [
          tokenAddress, // the token address
          WBNB_ADDRESS[networkId], // WBNB
        ])
        .call()
      updatePriceInBNB(outputWBNB)
    } catch (error) {
      console.error('unable to fetch price for: ' + tokenAddress)
    }
  }, [tokenAddress, oneUnitOfToken, contract.methods, networkId])

  useEffect(() => {
    if (account && contract && decimals !== '0') {
      fetchPrice()
    }
  }, [contract, account, fetchPrice, decimals])

  return { priceInBNB, fetchPrice }
}

/**
 * useTokenPriceInBNB 获取1个单位的代币在 Swap 合约中的价格（以BNB计价）
 * @param tokenAddress Address of ERC20/BEP20 Token
 * @param decimals Token decimals, optional, default is 18. Needs to fill if decimals is not 18
 */
export function useTokenPriceInBUSD(
  tokenAddress: string,
  decimals: number | string = 18,
  isLp: boolean = false,
) {
  const { account, ethereum, chainId } = useWallet()
  // use BigNumber, format them at the display part please
  const [priceInBUSD, updatePriceInBUSD] = useState('0')
  // 97 stands for bsc testnet
  const networkId = chainId
  const busdAddr = BUSD_ADDRESS[networkId]
  const contract = useMemo(() => {
    return getSwapRouter(ethereum as provider, ROUTER02_ADDRESS[networkId])
  }, [ethereum, networkId])

  const oneUnitOfToken = utils.parseUnits('1', decimals)

  const fetchPrice = useCallback(async () => {
    if (isLp) {
      // LP 做特殊处理
      const fresult = await getTotalLiquidity(
        ethereum as provider,
        tokenAddress,
        busdAddr,
        chainId
      )
      updatePriceInBUSD(fresult)
      return
    }
    if (tokenAddress.toLowerCase() === busdAddr) {
      // 1 BUSD = 1 BUSD 没毛病
      updatePriceInBUSD(oneUnitOfToken.toString())
      return
    }
    try {
      const [, outputBUSD] = await contract.methods
        .getAmountsOut(oneUnitOfToken, [
          tokenAddress, // the token address
          busdAddr, // BUSD
        ])
        .call()
      updatePriceInBUSD(outputBUSD)
    } catch (error) {
      console.error('unable to fetch price for: ' + tokenAddress)
    }
  }, [isLp, tokenAddress, busdAddr, ethereum, chainId, oneUnitOfToken, contract.methods])

  useEffect(() => {
    if (account && contract && decimals !== '0') {
      fetchPrice()
    }
  }, [contract, account, fetchPrice, decimals])

  return { priceInBUSD, fetchPrice }
}
