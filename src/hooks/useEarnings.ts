import { useCallback, useEffect, useMemo, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

// import { getEarned, getMasterChefContract } from '../sushi/utils'
// import useSushi from './useSushi'
// import useBlock from './useBlock'
import { getContract } from '../utils/pool'
import useFarm from './useFarm'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum } = useWallet()
  const farm = useFarm(pid)

  const contract = useMemo(() => {
    return getContract(ethereum as provider, farm.poolAddress)
  }, [ethereum, farm.poolAddress])

  const fetchBalance = useCallback(async () => {
    const balance = await contract.methods.earned(account).call();
    setBalance(new BigNumber(balance))
  }, [account, contract])

  useEffect(() => {
    if (account && contract) {
      fetchBalance()
    }
    let refreshInterval = setInterval(fetchBalance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, pid, setBalance, contract, fetchBalance])

  return balance
}

export default useEarnings
