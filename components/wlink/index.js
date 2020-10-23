import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import styles from './index.module.css'

export default function Wlink({ href, children, className, external = true }) {
  if (external) {
    return (
      <a className={cn(styles.link, className)} href={href}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href}>
      <a className={cn(styles.link, className)}>{children}</a>
    </Link>
  )
}
