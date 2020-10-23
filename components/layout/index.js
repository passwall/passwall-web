import React from 'react'
import cn from 'classnames'

import styles from './index.module.css'

import Nav from '../nav'

function Layout({ children, className }) {
  return (
    <div className={cn(styles.layout)}>
      <main className={className}>{children}</main>
    </div>
  )
}

export default Layout
