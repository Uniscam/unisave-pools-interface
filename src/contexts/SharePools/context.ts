import { createContext } from 'react'
import { SharePoolsContext } from './types'

const context = createContext<SharePoolsContext>({
  sharePools: [],
})

export default context
