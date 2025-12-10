import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import styles from './index.module.scss'

import Text from '../text'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Text tag="p" theme="small">
          © {new Date().getFullYear()} Passwall. Open Source Password Manager.
        </Text>
        <div className={styles.footerLinks}>
          <Link href="/privacy">
            <a>Privacy Policy</a>
          </Link>
          <span className={styles.separator}>•</span>
          <a href="https://github.com/passwall" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span className={styles.separator}>•</span>
          <a href="mailto:hello@passwall.io">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}

