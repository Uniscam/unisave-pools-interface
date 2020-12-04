import { useWallet } from "use-wallet"
import { Y3D_ADDRESS } from "../constants/tokenAddresses"

export default () => {
    const { chainId } = useWallet()
    return {
        address: Y3D_ADDRESS[chainId]
    }
}