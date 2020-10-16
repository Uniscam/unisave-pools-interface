import { useCallback, useEffect, useMemo, useState } from "react";
import { provider } from 'web3-core'
import { utils } from "ethers";
import { useWallet } from "use-wallet";
import { getUniswapRouter02 } from "../utils/uniswap";

export function useEDCPrice() {
    const { account, ethereum } = useWallet()
    const [ priceInWETH, updatePriceInWETH ] = useState("0")
    const [ priceInUSDT, updatePriceInUSDT ] = useState("0")

    const contract = useMemo(() => {
        return getUniswapRouter02(ethereum as provider)
    }, [ethereum])

    const fetchPrice = useCallback(async () => {
        const [, outputWETH] = await contract.methods.getAmountsOut(utils.parseUnits("1", 18), [
            '0xae66bea480f7a6c91f07c58f2aee185883558fb8', // EDC
            '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' // WETH
        ]).call();
        const [,,outputUSDT] = await contract.methods.getAmountsOut(utils.parseUnits("1", 18), [
            '0xae66bea480f7a6c91f07c58f2aee185883558fb8', // EDC
            '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
            '0xdAC17F958D2ee523a2206206994597C13D831ec7'
        ]).call();
        updatePriceInWETH(outputWETH)
        updatePriceInUSDT(outputUSDT)
      }, [contract])

      useEffect(() => {
        if (account && contract) {
            fetchPrice()
        }
      }, [contract, account, fetchPrice])

      return { priceInUSDT, priceInWETH, fetchPrice }
}
