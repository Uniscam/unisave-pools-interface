import React from 'react'

import './index.css'

export interface NFTCardProps {
  info: any,
}

const NFTCard: React.FC<NFTCardProps> = ({
  info
}) => {
  const { name, balance, image, attributes } = info
  console.log(info)
  // @ts-ignore
  const price = { ...attributes.find(trait => trait.trait_type === 'Y3D Auction Base') }.value || '0'
  // const [imagePath, setImagePath] = useState('')

  function GetButtonStatus() {
    if (balance > 0) {
      return (
        <button className="card-bmbar-button">
          STAKE
        </button>
      )
    }
    else {
      return (
        <button className="card-bmbar-button">
          PURCHASE
        </button>
      )
    }
  }

  return (
    <div className="card">
      <div className="card-info">
        <div className="card-info-imgbox">
          <img className="card-info-img" src={image} alt='card' />
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
        <GetButtonStatus />
      </div>
    </div>
  )
}

export default NFTCard