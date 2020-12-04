import { useCallback } from 'react'
import { ethers } from 'ethers'

// import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
// import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

// import { approve, getMasterChefContract } from '../sushi/utils'
import useFarm from './useFarm'
import useSharePool from './useSharePool'

const useApprove = (lpContract: Contract, pid: number, isSharePool: boolean = false) => {
  const { account } = useWallet()
  const sharePool = useSharePool(pid)
  const farmPool = useFarm(pid)
  const farm = isSharePool ? sharePool : farmPool
  console.log('useApprove::farm:', farm)

  if (!account) {
    console.error('useApprove::error:', 'Unlock wallet first!')
  }

  const handleApprove = useCallback(async () => {
    try {
      return await lpContract.methods.approve(farm.poolAddress, ethers.constants.MaxUint256)
        .send({ from: account })
    } catch (e) {
      console.error('useApprove::handleApprove:error:', e)
      return false
    }
  }, [account, lpContract, farm])

  return { onApprove: handleApprove }
}

export default useApprove
