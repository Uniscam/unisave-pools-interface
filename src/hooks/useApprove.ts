import { useCallback } from 'react'
import { ethers } from 'ethers'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getMasterChefContract } from '../sushi/utils'
import useFarm from './useFarm'

const useApprove = (lpContract: Contract, pid: number) => {
  const { account } = useWallet()
  const farm = useFarm(pid)

  const handleApprove = useCallback(async () => {
    try {
      return await lpContract.methods.approve(farm.poolAddress, ethers.constants.MaxUint256)
        .send({ from: account })
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, lpContract, farm])

  return { onApprove: handleApprove }
}

export default useApprove
