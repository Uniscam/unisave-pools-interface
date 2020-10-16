import Web3 from 'web3'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { provider } from 'web3-core'
// import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import Router02ABI from '../constants/abi/UniswapRouter.json'

export const getUniswapRouter02 = (provider: provider) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    (Router02ABI as unknown) as AbiItem,
    '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  )
  return contract
}
