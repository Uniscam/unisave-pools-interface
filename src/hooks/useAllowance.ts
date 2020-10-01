import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getMasterChefContract } from '../sushi/utils'
import useFarm from './useFarm'

const useAllowance = (lpContract: Contract, pid: number) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account } = useWallet()
  const farm = useFarm(pid)

  const fetchAllowance = useCallback(async () => {
    const allowance = await lpContract.methods.allowance(account, farm.poolAddress).call()
    console.warn(allowance)
    setAllowance(new BigNumber(allowance))
  }, [account, farm, lpContract])

  useEffect(() => {
    if (account && farm && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, farm, lpContract])

  return allowance
}

export default useAllowance
