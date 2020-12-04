import { Addresses } from './tokenAddresses'

// export interface Addresses {
//     [chainId: number]: string
// }

export interface StakingTokenAddressObj extends Addresses {
    name: string
    symbol: string
    tokenSymbol: string
    isWBNB: boolean
    isLpToken: boolean
    icon: string
}

export interface SharePoolObj {
    poolAddresses: Addresses
    stakingTokenAddresses: Array<StakingTokenAddressObj>
    icon: string
    name: string
    p3d: number
    magnification: number
}

export const SharePools: Array<SharePoolObj> = [
    {
        poolAddresses: {
            56: '0x963FfA229E0197a3cA070Da8b0C9316142B635d2',
            97: '0x68741369e9d45227a03bD420D1429A0684809837',
            // Ref 0x63c96a4ef286a807ee2ae3131331669efed9e6a1
        },
        stakingTokenAddresses: [
            {
                56: '0x368F9Fb3b2205B6dD5A629D0449E249115ca84C8',
                name: 'USDT/USDC LP',
                symbol: 'USDT/USDC LP',
                tokenSymbol: 'USDT/USDC LP',
                isWBNB: false,
                isLpToken: true,
                icon: 'y3d',
            },
            {
                56: '0xc7353bDAa987849541657A113984822b5727FAC5',
                name: 'DAI/USDC LP',
                symbol: 'DAI/USDC LP',
                tokenSymbol: 'DAI/USDC LP',
                isWBNB: false,
                isLpToken: true,
                icon: 'y3d',
            },
            {
                56: '0xe2aB6c934b1854C5e4C3BaC60cdc5852516e0075',
                name: 'DAI/USDT LP',
                symbol: 'DAI/USDT LP',
                tokenSymbol: 'DAI/USDT LP',
                isWBNB: false,
                isLpToken: true,
                icon: 'y3d',
            }
        ],
        icon: 'y3d',
        name: 'Muti Pool',
        p3d: 0,
        magnification: 2,
    }
]
