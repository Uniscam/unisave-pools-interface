import React, { useEffect } from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import { useState } from 'react'
import "./index.css"
import { useWallet } from 'use-wallet'
import { encryptText } from '../../utils/compress'

import theme from '../../theme'

const Referral: React.FC = () => {
  const [link, setLink] = useState('')
  const { account, reset } = useWallet()

  function copyToClipboard (link: string): any {
    const text = link
    if (
      document.queryCommandSupported &&
      document.queryCommandSupported('copy')
    ) {
      var textarea = document.createElement('textarea')
      textarea.textContent = text
      textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        return // Security exception may be thrown by some browsers.
      } catch (ex) {
        console.error('failed')
        return
      } finally {
        document.body.removeChild(textarea)
      }
    }
  }

  useEffect(() => {
    let text = ''
    if (account === null) text = 'Unlock Your Wallet First'
    else text = window.location.origin + '/referral?l=' + encryptText(account)
    setLink(text)
  }, [link, account, reset])

  return (
    <Page>
      <StyledReferralBox>
        <span style={relTitleStyle}>Referral</span>
        <div style={commonDivStyle}>
          <input disabled style={relLinkInputStyle} value={link} />
          <button className="rel-copy-btn" onClick={copyToClipboard(link)}>Copy</button>
        </div>
      </StyledReferralBox>
    </Page>
  )
}

const StyledReferralBox = styled.div`
  width: 100%;
`

const commonDivStyle = {
  width: "auto",
  display: "flex",
  padding: "0 300px",
  marginTop: "20px",
}

const relTitleStyle = {
  marginTop: "30px",
  fontSize: "30px",
  textAlign: "center" as const,
  display: "block",
  color: theme.color.yellow
}

const relLinkInputStyle = {
  outline: "none",
  height: "40px",
  width: "calc(100% - 57px)",
  border: "2px solid " + theme.color.yellow,
  borderTopLeftRadius: "999px",
  borderBottomLeftRadius: "999px",
  borderRight: "none",
  padding: "0 20px",
  color: "white"
}

export default Referral
