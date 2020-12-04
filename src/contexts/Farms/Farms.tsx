import React from 'react'

import { useWallet } from 'use-wallet'
import { Pools } from '../../constants/pools'
import { Y3D_ADDRESS } from '../../constants/tokenAddresses'

// import { bnToDec } from '../../utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const { chainId } = useWallet()

  const farms: Array<Farm> = Pools.filter(pool => (pool.poolAddresses as any)[chainId]).map(
    ({
      poolAddresses,
      name,
      symbol,
      tokenSymbol,
      stakingTokenAddresses,
      acceleratorAddresses,
      isWBNB,
      isLpToken,
      icon,
      nftSymbol,
      magnification,
      p3d
    }: any, index) => ({
      pid: index,
      id: symbol.replace('/', '-'),
      name,
      poolAddress: poolAddresses[chainId],
      stakingToken: symbol,
      stakingTokenAddress: stakingTokenAddresses[chainId],
      acceleratorAddress: acceleratorAddresses?.[chainId],
      tokenSymbol,
      earnToken: 'y3d',
      earnTokenAddress: Y3D_ADDRESS[chainId],
      isWBNB,
      isLpToken,
      icon,
      nftSymbol: nftSymbol ?? '',
      magnification,
      p3d: p3d ?? 0
    }),
  );
  console.log('FarmsContexts::farms:', farms)

  return (
    <Context.Provider
      value={{
        farms,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
