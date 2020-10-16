import React, { useState } from 'react'
import styled from 'styled-components'
import capitalize from '../../../utils/capitalize'

export interface SwitcherProps {
  switcherList: Array<string>,
  onChange: (name: string) => void,
}

export interface SwitcherItemProps {
  isActive: boolean,
}

const Switcher: React.FC<SwitcherProps> = (props) => {
  const { switcherList, onChange } = props
  const [activeItem, setActiveItem] = useState('holder')
  const handleSwitcherItemChange = (name: string) => {
    setActiveItem(name)
    onChange(name)
  }

  return (
    <StyledSwitcherWrapper>
      <StyledSwitcherLine />
      {switcherList.map((item, i) => (
        <StyledSwitcherItem
          key={`switcher-item-${item}-${i}`}
          isActive={activeItem === item.toLowerCase()}
          onClick={() => handleSwitcherItemChange(item.toLowerCase())}
        >
          {capitalize(item)}
        </StyledSwitcherItem>
      ))}
    </StyledSwitcherWrapper>
  )
}

const StyledSwitcherWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  position: relative;
  margin-bottom: 20px;
`

const StyledSwitcherLine = styled.div`
  width: 100%;
  border-bottom: 2px solid #6ec0ff;
  position: absolute;
  bottom: 0;
  z-index: -1;
`

const StyledSwitcherItem = styled.div<SwitcherItemProps>`
  color: ${props => props.isActive ? '#6ec0ff' : '#6E6E6E'};
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  line-height: 1;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${props => props.isActive ? '#6ec0ff' : 'transparent'};
  cursor: pointer;
  &:hover {
    color: #0091FF;
    border-color: #0091FF;
  }
`

export default Switcher