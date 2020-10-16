import { useCallback, useEffect, useMemo, useState } from "react";
import { provider } from 'web3-core'
import { useWallet } from "use-wallet";
import { BigNumber } from "../sushi";
import { getContract } from "../utils/pool";

export function useRewardPerToken(poolAddress: string) {
    const { account, ethereum } = useWallet()
    const [ rewardPerToken, updateRewardPerToken ] = useState(new BigNumber(0))

    const contract = useMemo(() => {
        return getContract(ethereum as provider, poolAddress)
    }, [ethereum, poolAddress])

    const update = useCallback(async () => {
        const _rewardPerToken = await contract.methods.rewardPerToken().call();
        updateRewardPerToken(_rewardPerToken)
      }, [contract])

      useEffect(() => {
        if (account && contract) {
            update()
        }
      }, [contract, account, update])

      return { rewardPerToken, update }
}
