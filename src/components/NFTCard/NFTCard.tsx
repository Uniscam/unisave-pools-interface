import React from 'react'

import './index.css'

import { NftAssets } from  '../../constants/vestNFTs'

export interface NFTCardProps {
  info: NftAssets,
}

const NFTCard: React.FC<NFTCardProps> = ({
  info
}) => {
  const { name, traits, image_url } = info
  const price = { ...traits.find(trait => trait.trait_type === 'Y3D Value') }.value || '0'
  // const [imagePath, setImagePath] = useState('')

  return (
    <div className="card">
      <div className="card-info">
        <div className="card-info-imgbox">
          <img className="card-info-img" src={image_url} alt='card' />
        </div>
        <p className="card-info-name">
          {name}
        </p>
      </div>
      <div className="card-bmbar">
        <p className="card-bmbar-price">
          {price}
          <span className="card-bmbar-unit">
            Y3D
          </span>
        </p>
        <button className="card-bmbar-button">
          PURCHASE
        </button>
      </div>
    </div>
  )
}

export default NFTCard