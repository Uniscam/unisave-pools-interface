// import BigNumber from "bignumber.js"
import { useCallback, useEffect, useState } from "react"
import { useWallet } from "use-wallet"
import web3 from '../web3'
import RefReward from '../constants/abi/RefReward.json'

const useRefReward = () => {
    const [rewardStatus, setRewardStatus] = useState([false, false, false])
    const { account } = useWallet()

    const contract = new web3.eth.Contract(RefReward as any, '0x1F8BAAcdE5489d8BA634f5F30d45672560C119Dd')

    const fetchRewardStatus = useCallback(async () => {
      const token1 = await contract.methods.canReward(account, 0).call()
      const token2 = await contract.methods.canReward(account, 1).call()
      const token3 = await contract.methods.canReward(account, 2).call()
      const token4 = await contract.methods.canReward(account, 3).call()
      const token5 = await contract.methods.canReward(account, 4).call()
      console.log('useRefReward::fetchRewardStatus token1:', token1, 'token2:', token2, 'token3:', token3, 'token4:', token4, 'token5:', token5,)
      setRewardStatus([token1, token2, token3, token4, token5])
    }, [account, contract])

    useEffect(() => {
      if (account && contract) {
        fetchRewardStatus()
      }
    }, [account, fetchRewardStatus, contract, setRewardStatus])

    const handleClaimNFT = useCallback(
      async (id: number) => {
        try {
          const txHash: string = await contract.methods
          .claim(id)
          .send({ from: account })
          .on('transactionHash', (tx: { transactionHash: string }) => {
            console.log('useRefReward::handleClaimNFT tx:', tx)
            return tx.transactionHash
          })
          console.log('useRefReward::handleClaimNFT txHash:', txHash)
          return txHash
        } catch (error) {
          console.error('useRefReward::handleClaimNFT error:', error)
        }
      }, [account, contract.methods])

    return { rewardStatus, onClaimNFT: handleClaimNFT }
}

export default useRefReward
