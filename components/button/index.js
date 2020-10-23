import React from 'react'
import cn from 'classnames'

import styles from './index.module.scss'

export function DownloadButton({
  children,
  className,
  disable = false,
  ...props
}) {
  return (
    <button
      type="button"
      className={cn(styles.downloadButton, className, { disable })}
      {...props}
    >
      {children}
    </button>
  )
}

function Button({ children, className, ...props }) {
  return (
    <button type="button" className={cn(styles.normal, className)} {...props}>
      {children}
    </button>
  )
}

export default Button
