import BigNumber from "bignumber.js"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useWallet } from "use-wallet"
import { provider } from 'web3-core'
import { getContract } from "../../utils/sharePool"
import useSharePool from '../useSharePool'

const useTotalSupply = (pid: number) => {
    const [totalSupply, setTotalSupply] = useState(new BigNumber(0))
    const { account, ethereum } = useWallet()
    const farm = useSharePool(pid)

    const contract = useMemo(() => {
      return getContract(ethereum as provider, farm.poolAddress)
    }, [ethereum, farm])

    const fetchTotalSupply = useCallback(async () => {
        const totalSupply = await contract.methods.totalSupply().call()
        setTotalSupply(new BigNumber(totalSupply))
    }, [contract])

    useEffect(() => {
      if (account && contract) {
        fetchTotalSupply()
      }
    }, [account, fetchTotalSupply, contract, setTotalSupply])

    return totalSupply
}

export default useTotalSupply