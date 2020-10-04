import { useCallback, useMemo } from 'react'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { getContract } from '../../utils/nft'
import { NFT_CLAIMER_ADDRESS } from '../../constants/tokenAddresses'

const useClaim = () => {
  const { account, ethereum } = useWallet()
  const nftClaimerAddr = NFT_CLAIMER_ADDRESS

  const contract = useMemo(() => {
    return getContract(ethereum as provider, nftClaimerAddr)
  }, [ethereum, nftClaimerAddr])

  const handleNftClaim = useCallback(async () => {
    const call = contract.methods.claim().send({ from: account })

    const txHash = await call.on('transactionHash', (tx: any) => {
      console.log('NFT::useClaim::handleNftClaim tx:', tx)
      return tx.transactionHash
    })

    console.log('NFT::useClaim::handleNftClaim txHash:', txHash)
  }, [account, contract.methods])

  return { onClaim: handleNftClaim }
}

export default useClaim