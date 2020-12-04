import { useCallback, useMemo } from 'react'
import { provider } from 'web3-core'

// import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

// import { unstake, getMasterChefContract } from '../sushi/utils'
import useSharePool from '../useSharePool'
import { getContract } from '../../utils/sharePool'
import BigNumber from 'bignumber.js'

const useUnstake = (pid: number, symbol: string) => {
  const { account, ethereum } = useWallet()
  const farm = useSharePool(pid)
  const findTokenInfo = farm.stakingTokenAddresses.find(stake => stake.symbol === symbol)
  const tokenAddr = findTokenInfo.address
  // console.log('useUntake::findTokenInfo:', findTokenInfo, 'symbol:', symbol)

  const contract = useMemo(() => {
    return getContract(ethereum as provider, farm.poolAddress)
  }, [ethereum, farm.poolAddress])

  const handleUnstake = useCallback(
    async (amount: string) => {
      const value = new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
      const txHash = await contract.methods
      .withdraw(
        tokenAddr,
        value,
      )
      .send({ from: account })
      .on('transactionHash', (tx: any) => {
        console.log(tx)
        return tx.transactionHash
      })
      console.log(txHash)
    },
    [account, contract, tokenAddr],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
