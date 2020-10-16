import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { useWallet } from 'use-wallet'

import web3 from '../../web3/'

import Page from '../../components/Page'
import useReferral from '../../hooks/useReferral'
import RefABI from '../../constants/abi/Ref.json'

import "./index.css"
import theme from '../../theme'
import { setCookie } from '../../utils/cookie'
import { decryptText, encryptText } from '../../utils/compress'

const Referral: React.FC = () => {
  const [link, setLink] = useState('')
  const [ invitedNum, setInvitedNum ] = useState(0)
  const [ harvestedNum, setHarvestedNum ] = useState(0)
  const [ rebateNum, setRebateNum ] = useState(0)
  const [ rebatePercent ] = useState(0.07)
  const [ invitedList, setInvitedList ] = useState([])

  const { account, reset } = useWallet()
  const RefAddress = useReferral()

  const queryParse = (search = window.location.search) => {
    if (!search) return {}
    const queryString = search[0] === '?' ? search.substring(1) : search
    const query: any = {}
    queryString
        .split('&')
        .forEach(queryStr => {
            const [key, value] = queryStr.split('=')
            if (key) query[decodeURIComponent(key)] = decodeURIComponent(value)
        })
    return query
  }

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

  function rawSha3ToAddress(raw: string): any {
    return '0x' + raw.substring(raw.length - 40, raw.length)
  }
  // @ts-ignore
  const Ref: any = new web3.eth.Contract(RefABI, RefAddress.address)
  useEffect(() => {
    let text = ''
    if (account === null) text = 'Unlock Your Wallet First'
    else text = window.location.origin + '/referral?l=' + encryptText(account)
    setLink(text)
    if (window.location.search) {
      const addr = decryptText(queryParse().l)
      setCookie('invite_id', addr, 9999)
    }
    if (account) {
      let mySubordinates = new Set()
      Ref.getPastEvents('ReferrerSet', {
        fromBlock: 0,
        toBlock: 'latest'
      }, (error: any, res: any) => {
        if (error) console.error(error)
        // @ts-ignore
        res.forEach(item => {
          let refRaw = web3.utils.toHex(item.raw.topics[2])
          refRaw = rawSha3ToAddress(refRaw)
          if (refRaw === account.toLocaleLowerCase()) {
            mySubordinates.add(rawSha3ToAddress(web3.utils.toHex(item.raw.topics[1])))
          }
        })
        setInvitedList(Array.from(mySubordinates.values()))
        setInvitedNum(mySubordinates.size)
      })

      Ref.methods.score(account).call().then((score: any) => {
        setRebateNum(score)
        setHarvestedNum(Number((score / rebatePercent).toFixed(3)))
      })
    }
    // eslint-disable-next-line
  }, [link, account, reset])

  function InvitedDashboard() {
    const dashboardHtml = (
      <div>
        <h3 className="dashboard-title">
          Dashboard
        </h3>
        <div className="dashboard-card">
          <div className="dashboard-card-invited">
            <p className="dashboard-card-invited-title">
              Invited
            </p>
            <p className="dashboard-card-invited-value">
              {invitedNum}
              <span>People</span>
            </p>
          </div>
          <div className="dashboard-card-col">
            <div className="dashboard-card-col-label">
              <p className="dashboard-card-col-label-value">
                {harvestedNum}
                <span>Best</span>
              </p>
              <p className="dashboard-card-col-label-title">
                Harvested
              </p>
            </div>
            <div className="dashboard-card-col-label">
              <p className="dashboard-card-col-label-value">
                {rebateNum}
                <span>Best ({Math.round(rebatePercent * 100)}%)</span>
              </p>
              <p className="dashboard-card-col-label-title">
                Rebate
              </p>
            </div>
          </div>
        </div>
        <div className="address-list">
          <h3 className="address-list-title">
            Invited People
          </h3>
          <AddressList list={invitedList} />
          { invitedList.length ? null : <p className="address-list-entry">No invited people</p> }
        </div>
      </div>
    )
    const notLogged = (
      <div>
        <h3 className="dashboard-title">
          Dashboard
        </h3>
        <div className="dashboard-card">
          <div className="dashboard-card-invited">
            <p className="dashboard-card-invited-title">
              Not logged
            </p>
          </div>
        </div>
      </div>
    )
    if (account) return dashboardHtml
    else return notLogged
  }
  
  function AddressList(props: any): any {
    return props.list.map((item: string, index: number) => {
      return (
        <p className="address-list-entry">
          {index + 1}. {item}
        </p>
      )
    })
  }

  return (
    <Page>
      <StyledReferralBox>
        <span style={relTitleStyle}>Referral</span>
        <div style={commonDivStyle}>
          <input disabled style={relLinkInputStyle} value={link} />
          <button className="rel-copy-btn" onClick={copyToClipboard(link)}>Copy</button>
        </div>
        <InvitedDashboard />
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
