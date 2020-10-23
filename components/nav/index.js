import React from 'react'
import * as Icons from 'heroicons-react'

import styles from './index.module.css'

import Wlink from '../wlink'
import { DownloadButton } from '../button'
import { PAGES, DOWLOAD_LINKS } from '../../constants'

export function MobileNav() {
  const navLinksRef = React.createRef(null)

  const animateMobileNav = () => {
    navLinksRef.current.classList.toggle(styles.navOpen)
  }

  return (
    <nav className={styles.mobileNav}>
      <div className={styles.navHead}>
        <Wlink href="/">
          <img
            className={styles.logo}
            src="/images/passwall-logo.png"
            alt="logo"
            width="150"
          />
        </Wlink>
        <div className={styles.hamburger} onClick={animateMobileNav}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </div>

      <ul className={styles.navLinks} ref={navLinksRef}>
        {Object.keys(PAGES).map((key) => {
          const PAGE = PAGES[key]
          return (
            <li key={key} className={styles.navLink}>
              <Wlink href={PAGE.path} key={`link-${key}`}>
                {PAGE.name}
              </Wlink>
            </li>
          )
        })}
        <li className={styles.downloadSection}>
          {DOWLOAD_LINKS.map((item) => (
            <DownloadButton key={item.name}>
              <a href={item.link}>{item.name}</a>
              <Icons.Download width={15} height={15} />
            </DownloadButton>
          ))}
        </li>
      </ul>
    </nav>
  )
}

function Nav() {
  return (
    <nav className={styles.nav}>
      {Object.keys(PAGES).map((key) => {
        const PAGE = PAGES[key]
        return (
          <Wlink href={PAGE.path} key={`link-${key}`}>
            {PAGE.name}
          </Wlink>
        )
      })}
    </nav>
  )
}

export default Nav
