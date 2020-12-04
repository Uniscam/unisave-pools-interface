import { useCallback, useMemo } from 'react'
import { provider } from 'web3-core'

// import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

// import { stake, getMasterChefContract } from '../sushi/utils'
import useSharePool from '../useSharePool'
import { getContract } from '../../utils/sharePool'
import BigNumber from 'bignumber.js'

const useStake = (pid: number, symbol: string) => {
  const { account, ethereum } = useWallet()
  const farm = useSharePool(pid)
  const findTokenInfo = farm.stakingTokenAddresses.find(stake => stake.symbol === symbol)
  const tokenAddr = findTokenInfo.address
  console.log('useStake::findTokenInfo:', findTokenInfo, 'symbol:', symbol)

  const contract = useMemo(() => {
    return getContract(ethereum as provider, farm.poolAddress)
  }, [ethereum, farm])

  const handleStake = useCallback(
    async (amount: string) => {
      const value = new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()

      const call = contract.methods.stake(tokenAddr, value).send({ from: account })

      const txHash = call.on('transactionHash', (tx: any) => {
        console.log(tx)
        return tx.transactionHash
      })
      console.log(txHash)
    },
    [account, contract.methods, tokenAddr],
  )

  const handleStakeWithRef = useCallback(
    async (amount: string, addr: string) => {
      if (addr === '') {
        addr = '0x6465F1250c9fe162602Db83791Fc3Fb202D70a7B'
      }
      console.log('amount', amount)
      console.log('amount', addr)
      const value = new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()

      const call = contract.methods.stakeWithRef(tokenAddr, value, addr).send({ from: account })

      const txHash = call.on('transactionHash', (tx: any) => {
        console.log(tx)
        return tx.transactionHash
      })
      console.log(txHash)
    },
    [account, contract.methods, tokenAddr],
  )

  return { onStake: handleStake, onStakeWithRef: handleStakeWithRef }
}

export default useStake
