import React from 'react'
import * as Icons from 'heroicons-react'

import styles from './index.module.css'

import Header from '../nav'
import { DownloadButton } from '../button'
import { DOWLOAD_LINKS } from '../../constants'

export default function LeftSide() {
  return (
    <div className={styles.leftSide}>
      <Header />
      <img
        className={styles.bgImage}
        src="/images/bg-image.png"
        alt="bg-image"
      />
      <img className={styles.logo} src="/images/passwall-logo.png" alt="logo" />
      <div className={styles.dowloadSection}>
        {DOWLOAD_LINKS.map((item) => (
          <DownloadButton key={item.name}>
            <a href={item.link}>{item.name}</a>
            <Icons.Download width={15} height={15}/>
          </DownloadButton>
        ))}
      </div>
    </div>
  )
}
