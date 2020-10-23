import React from 'react'
import cn from 'classnames'
import styles from './index.module.scss'

import Text from '../text'

export default function BottomBar() {
  return (
    <div className={styles.BottomBar}>
      <Text tag="h5" theme="regular" fancy>
        Keep in mind
      </Text>
      <Text tag="p" theme="small">
        We do not store your master password anywhere and if you forget your
        master password there is no way to restore it.
      </Text>
    </div>
  )
}
