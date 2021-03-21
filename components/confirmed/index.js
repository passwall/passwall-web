import React from 'react'
import styles from './index.module.scss'
import * as Icons from 'heroicons-react'
import { DOWLOAD_LINKS } from '../../constants'
import { DownloadButton } from '../button'

export default function Confirmed() {
  return (
    <div className={styles.container}>
      <Icons.Key size={52} color="#5707FF" className={styles.key} />
      <Icons.LockClosed size={52} color="#00FFD1" className={styles.lock} />
      <Icons.CreditCard
        size={52}
        color="#4D91FF"
        className={styles.creditCard}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60vh'
        }}
      >
        <img src="/images/passwall-logo.png" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Icons.CheckCircle height={96} width={96} color="#00FFD1" />
          <h2 style={{ marginTop: 8 }}>Thank you!</h2>
          <h4 className={styles.subText}>Your account has been confirmed!</h4>
        </div>
        <div className={styles.dowloadSection}>
          {DOWLOAD_LINKS.map((item) => (
            <DownloadButton key={item.name}>
              <a href={item.link}>{item.name}</a>
              <Icons.Download width={15} height={15} />
            </DownloadButton>
          ))}
        </div>
      </div>
    </div>
  )
}
