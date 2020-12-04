import { useCallback, useEffect, useMemo, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

// import { getStaked, getMasterChefContract } from '../sushi/utils'
// import useSushi from './useSushi'
// import useBlock from './useBlock'
import useSharePool from '../useSharePool'
import { getContract } from '../../utils/sharePool'

const useStakedBalance = (pid: number, symbol: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum } = useWallet()
  const farm = useSharePool(pid)
  const findTokenInfo = farm.stakingTokenAddresses.find(stake => stake.symbol === symbol)
  const tokenAddr = findTokenInfo.address

  const contract = useMemo(() => {
    return getContract(ethereum as provider, farm.poolAddress)
  }, [ethereum, farm.poolAddress])

  const fetchBalance = useCallback(async () => {
    const balance = await contract.methods._subBalances(account, tokenAddr).call();
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

export default useStakedBalance
