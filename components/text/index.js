import React from 'react'
import cn from 'classnames'
import styles from './index.module.scss'

const themeMap = {
  hero: styles.hero,
  heromd: styles.heroMd,
  large: styles.heading,
  medium: styles.medium,
  regular: styles.regular,
  small: styles.small
}

export default function Text({
  tag = 'h3',
  theme = 'text',
  fancy = false,
  className,
  children,
  ...props
}) {
  const Tag = tag
  return (
    <Tag
      className={cn(styles.text, themeMap[theme], { fancy }, className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
