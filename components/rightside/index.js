import React from 'react'
import cn from 'classnames'
import styles from './index.module.scss'

export default function RightSide({ children, className }) {
  return <div className={cn(styles.content, className)}>{children}</div>
}
