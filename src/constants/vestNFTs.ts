export interface NftAssetsContract {
  address: string
  name: string
  symbol: string
}

export interface NftAssetsTraits {
  trait_type: string
  value: string | number | null
  display_type: string | null
  max_value: string | number | null
  trait_count: number
  order: number | null
}

export interface NftAssets {
  id: number
  token_id: number
  background_color: string | null
  image_url: string | null
  image_preview_url: string | null
  image_thumbnail_url: string | null
  image_original_url: string | null
  name: string
  description: string
  asset_contract: NftAssetsContract
  decimals: number | null
  traits: Array<NftAssetsTraits>
}

export type VestNFT = {
  attributes: string
  levelLong: string
  levelShort: string
  displayName: string
  bestCost: number
  image: string
}

export const VestNFTAddress = '0x97bC42A3635453FaC5e1c7AF2d1fb2113cF4b25E'

export const VestNFTList: Array<NftAssets> = [
  {
    id: 1,
    token_id: 1,
    name: 'Hoe',
    description: 'Hoe',
    image_url: 'https://api.ayaka.moe/y3d-info/image/set1/Hoe1.png',
    background_color: null,
    image_preview_url: null,
    image_thumbnail_url: null,
    image_original_url: null,
    asset_contract: {
      address: VestNFTAddress,
      name: 'Meme',
      symbol: 'MEME',
    },
    decimals: null,
    traits: [
      {
        trait_type: 'Level',
        value: 1,
        display_type: null,
        max_value: null,
        trait_count: 0,
        order: null,
      },
      {
        trait_type: 'Type',
        value: 'hoe',
        display_type: null,
        max_value: null,
        trait_count: 4,
        order: null,
      },
      {
        trait_type: 'Y3D Value',
        value: '1.3413',
        display_type: null,
        max_value: null,
        trait_count: 1,
        order: null,
      },
    ],
  },
  {
    id: 2,
    token_id: 2,
    name: 'Copper Hoe',
    description: 'Copper Hoe',
    image_url: 'https://api.ayaka.moe/y3d-info/image/set1/Hoe2.png',
    background_color: null,
    image_preview_url: null,
    image_thumbnail_url: null,
    image_original_url: null,
    asset_contract: {
      address: VestNFTAddress,
      name: 'Meme',
      symbol: 'MEME',
    },
    decimals: null,
    traits: [
      {
        trait_type: 'Level',
        value: 2,
        display_type: null,
        max_value: null,
        trait_count: 0,
        order: null,
      },
      {
        trait_type: 'Type',
        value: 'hoe',
        display_type: null,
        max_value: null,
        trait_count: 4,
        order: null,
      },
      {
        trait_type: 'Y3D Value',
        value: '2.6408',
        display_type: null,
        max_value: null,
        trait_count: 1,
        order: null,
      },
    ],
  },
  {
    id: 3,
    token_id: 3,
    name: 'Steel Hoe',
    description: 'Steel Hoe',
    image_url: 'https://api.ayaka.moe/y3d-info/image/set1/Hoe3.png',
    background_color: null,
    image_preview_url: null,
    image_thumbnail_url: null,
    image_original_url: null,
    asset_contract: {
      address: VestNFTAddress,
      name: 'Meme',
      symbol: 'MEME',
    },
    decimals: null,
    traits: [
      {
        trait_type: 'Level',
        value: 3,
        display_type: null,
        max_value: null,
        trait_count: 0,
        order: null,
      },
      {
        trait_type: 'Type',
        value: 'hoe',
        display_type: null,
        max_value: null,
        trait_count: 4,
        order: null,
      },
      {
        trait_type: 'Y3D Value',
        value: '5.0026',
        display_type: null,
        max_value: null,
        trait_count: 1,
        order: null,
      },
    ],
  },
  {
    id: 4,
    token_id: 4,
    name: 'Gold Hoe',
    description: 'Gold Hoe',
    image_url: 'https://api.ayaka.moe/y3d-info/image/set1/Hoe4.png',
    background_color: null,
    image_preview_url: null,
    image_thumbnail_url: null,
    image_original_url: null,
    asset_contract: {
      address: VestNFTAddress,
      name: 'Meme',
      symbol: 'MEME',
    },
    decimals: null,
    traits: [
      {
        trait_type: 'Level',
        value: 4,
        display_type: null,
        max_value: null,
        trait_count: 0,
        order: null,
      },
      {
        trait_type: 'Type',
        value: 'hoe',
        display_type: null,
        max_value: null,
        trait_count: 4,
        order: null,
      },
      {
        trait_type: 'Y3D Value',
        value: '16.0830',
        display_type: null,
        max_value: null,
        trait_count: 1,
        order: null,
      },
    ],
  },
  {
    id: 5,
    token_id: 5,
    name: 'Iridium Hoe',
    description: 'Iridium Hoe',
    image_url: 'https://api.ayaka.moe/y3d-info/image/set1/Hoe5.png',
    background_color: null,
    image_preview_url: null,
    image_thumbnail_url: null,
    image_original_url: null,
    asset_contract: {
      address: VestNFTAddress,
      name: 'Meme',
      symbol: 'MEME',
    },
    decimals: null,
    traits: [
      {
        trait_type: 'Level',
        value: 5,
        display_type: null,
        max_value: null,
        trait_count: 0,
        order: null,
      },
      {
        trait_type: 'Type',
        value: 'hoe',
        display_type: null,
        max_value: null,
        trait_count: 4,
        order: null,
      },
      {
        trait_type: 'Y3D Value',
        value: '24.3413',
        display_type: null,
        max_value: null,
        trait_count: 1,
        order: null,
      },
    ],
  },
  {
    id: 6,
    token_id: 6,
    name: 'Watering Can',
    description: 'Watering Can',
    image_url: 'https://api.ayaka.moe/y3d-info/image/set2/Watering1.png',
    background_color: null,
    image_preview_url: null,
    image_thumbnail_url: null,
    image_original_url: null,
    asset_contract: {
      address: VestNFTAddress,
      name: 'Meme',
      symbol: 'MEME',
    },
    decimals: null,
    traits: [
      {
        trait_type: 'Level',
        value: 1,
        display_type: null,
        max_value: null,
        trait_count: 0,
        order: null,
      },
      {
        trait_type: 'Type',
        value: 'watering can',
        display_type: null,
        max_value: null,
        trait_count: 4,
        order: null,
      },
      {
        trait_type: 'Y3D Value',
        value: '2.7205',
        display_type: null,
        max_value: null,
        trait_count: 1,
        order: null,
      },
    ],
  },
  {
    id: 7,
    token_id: 7,
    name: 'Copper Watering Can',
    description: 'Copper Watering Can',
    image_url: 'https://api.ayaka.moe/y3d-info/image/set2/Watering2.png',
    background_color: null,
    image_preview_url: null,
    image_thumbnail_url: null,
    image_original_url: null,
    asset_contract: {
      address: VestNFTAddress,
      name: 'Meme',
      symbol: 'MEME',
    },
    decimals: null,
    traits: [
      {
        trait_type: 'Level',
        value: 2,
        display_type: null,
        max_value: null,
        trait_count: 0,
        order: null,
      },
      {
        trait_type: 'Type',
        value: 'watering can',
        display_type: null,
        max_value: null,
        trait_count: 4,
        order: null,
      },
      {
        trait_type: 'Y3D Value',
        value: '11.7628',
        display_type: null,
        max_value: null,
        trait_count: 1,
        order: null,
      },
    ],
  },
  {
    id: 8,
    token_id: 8,
    name: 'Steel Watering Can',
    description: 'Steel Watering Can',
    image_url: 'https://api.ayaka.moe/y3d-info/image/set2/Watering3.png',
    background_color: null,
    image_preview_url: null,
    image_thumbnail_url: null,
    image_original_url: null,
    asset_contract: {
      address: VestNFTAddress,
      name: 'Meme',
      symbol: 'MEME',
    },
    decimals: null,
    traits: [
      {
        trait_type: 'Level',
        value: 3,
        display_type: null,
        max_value: null,
        trait_count: 0,
        order: null,
      },
      {
        trait_type: 'Type',
        value: 'watering can',
        display_type: null,
        max_value: null,
        trait_count: 4,
        order: null,
      },
      {
        trait_type: 'Y3D Value',
        value: '5.0026',
        display_type: null,
        max_value: null,
        trait_count: 1,
        order: null,
      },
    ],
  },
]
