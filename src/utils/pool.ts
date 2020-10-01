import Web3 from 'web3'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import PoolABI from '../constants/abi/Pool.json'
import BNBPoolABI from '../constants/abi/BNBPool.json'

export const getContract = (provider: provider, address: string) => {
    const web3 = new Web3(provider)
    const contract = new web3.eth.Contract(
      (PoolABI as unknown) as AbiItem,
      address,
    )
    return contract
  }

export const getBNBContract = (provider: provider, address: string) => {
    const web3 = new Web3(provider)
    const contract = new web3.eth.Contract(
      (BNBPoolABI as unknown) as AbiItem,
      address,
    )
    return contract
  }