export interface StakingTokenAddress {
  address: string
  name: string
  symbol: string
  tokenSymbol: string
  isWBNB: boolean
  isLpToken: boolean
  icon: string
}

export interface SharePool {
  pid: number
  name: string
  poolAddress: string
  stakingTokenAddresses: Array<StakingTokenAddress>
  earnToken: string
  earnTokenAddress: string
  id: string
  icon: string
  p3d: number
  magnification: number
}

export interface SharePoolsContext {
  sharePools: SharePool[]
}
