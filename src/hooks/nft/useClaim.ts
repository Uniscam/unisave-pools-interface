import { useCallback } from 'react'
import web3 from '../../web3'
import RefReward from '../../constants/abi/RefReward.json'

import { useWallet } from 'use-wallet'

const useClaim = () => {
  const { account } = useWallet()
  const refRewardAddress = '0x153f07b2cc2a2e3a3fd55eb4479a22f1d680822b'

  const contract = new web3.eth.Contract(RefReward as any, refRewardAddress)

  const handleClaim = useCallback(
    async () => {
      const call = await contract.methods.claim().send({ from: account })
      const txHash = call.on('transactionHash', (tx: any) => {
        console.log(tx)
        return tx.transactionHash
      })
      console.log(txHash)
      window.location.reload()
    },
    [account, contract],
  )

  return { onClaim: handleClaim, refRewardContract: contract }
}

export default useClaim
