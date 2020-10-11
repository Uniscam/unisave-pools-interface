import { useCallback, useEffect, useMemo, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

// import { getEarned, getMasterChefContract, getFarms } from '../sushi/utils'
// import useSushi from './useSushi'
// import useBlock from './useBlock'
import useFarms from './useFarms'
import { getContract } from '../utils/pool'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account, ethereum } = useWallet()
  const [farms] = useFarms()

  const contracts = useMemo(() => {
    return farms.map(farm => getContract(ethereum as provider, farm.poolAddress))
  }, [ethereum, farms])

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      contracts.map(contract =>
        contract.methods.earned(account).call()
      ),
    )
    setBalance(balances)
  }, [account, contracts])

  useEffect(() => {
    if (account && contracts) {
      fetchAllBalances()
    }
  }, [account, fetchAllBalances, contracts, setBalance])

  return balances
}

export default useAllEarnings
