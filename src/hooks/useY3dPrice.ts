import { useCallback, useEffect, useMemo, useState } from "react";
import { provider } from 'web3-core'
import { utils } from "ethers";
import { useWallet } from "use-wallet";
import { getUniswapRouter02 } from "../utils/uniswap";
import { BUSD_ADDRESS } from "../constants/tokenAddresses";
// import { BigNumber } from "../sushi";

const { BigNumber } = utils

export function useY3dPrice() {
    const { account, ethereum } = useWallet()
    // const [ priceInWETH, updatePriceInWETH ] = useState(new BigNumber(0))
    const [ priceInUSD, updatePriceInBUSD ] = useState(new BigNumber(0))

    const contract = useMemo(() => {
        return getUniswapRouter02(ethereum as provider)
    }, [ethereum])

    const fetchPrice = useCallback(async () => {
        const [, outputBUSD] = await contract.methods.getAmountsOut(utils.parseUnits("1", 18), [
            '0x12e2fcfa079fc23ae82ab82707b402410321103f', // Y3D
            BUSD_ADDRESS // BUSD
        ]).call();
        updatePriceInBUSD(outputBUSD)
      }, [contract])

      useEffect(() => {
        if (account && contract) {
            fetchPrice()
        }
      }, [contract, account, fetchPrice])

      return { priceInUSD, fetchPrice }
}
