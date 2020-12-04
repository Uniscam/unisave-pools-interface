import { useContext } from 'react'
import { Context as SharePoolsContext, SharePool } from '../contexts/SharePools'

const useSharePool = (id: string | number): SharePool => {
  const { sharePools } = useContext(SharePoolsContext)
  const pool = typeof id === 'string' ? sharePools.find(pool => pool.id === id) : sharePools.find(pool => pool.pid === id)
  return pool
}

export default useSharePool
