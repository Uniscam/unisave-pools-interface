import { useContext } from 'react'
import { Context as SharePoolContext } from '../contexts/SharePools'

const useSharePools = () => {
  const { sharePools } = useContext(SharePoolContext)
  return [sharePools]
}

export default useSharePools
