import { useCallback, useMemo } from 'react'
import { provider } from 'web3-core'

// import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

// import { harvest, getMasterChefContract } from '../sushi/utils'
import { getContract } from '../../utils/pool'
import useSharePool from '../useSharePool'

const useReward = (pid: number) => {
  const { account, ethereum } = useWallet()
  const farm = useSharePool(pid)

  const contract = useMemo(() => {
    return getContract(ethereum as provider, farm.poolAddress)
  }, [ethereum, farm.poolAddress])

  const handleReward = useCallback(async () => {
      const txHash = await contract.methods
      .getReward()
      .send({ from: account })
      .on('transactionHash', (tx: any) => {
        console.log(tx)
        return tx.transactionHash
      })
      console.log(txHash)
    return ''
  }, [account, contract.methods])

  return { onReward: handleReward }
}

export default useReward
