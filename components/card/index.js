import React from 'react'
import cn from 'classnames'
import styles from './index.module.scss'

import Text from '../text'
import Button from '../button'
import { FREE_TIER, PAID_TIER } from '../../constants'
import Wlink from '../wlink'

export function FreeCard() {
  return (
    <>
      <div>
        <div className={cn(styles.cardHeader)}>
          <Text tag="h2" theme="heromd">
            Free
          </Text>
        </div>
        <ul className={cn(styles.cardBody)}>
          {FREE_TIER.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.name}>
                <Icon />
                <Text tag="p" theme="medium">
                  {item.name}
                </Text>
              </li>
            )
          })}
        </ul>
      </div>
      <Wlink className={styles.link} href="/free" external={false}>
        <Button className={styles.cardBtn}>
          <Text tag="p" theme="medium">
            SIGN UP
          </Text>
        </Button>
      </Wlink>
    </>
  )
}

export function PaidCard() {
  return (
    <>
      <div>
        <div className={cn(styles.cardHeader, 'pro')}>
          <Text tag="h2" theme="heromd" fancy>
            PRO
          </Text>
          <Text>
            <span>$2</span>/month
          </Text>
        </div>
        <ul className={cn(styles.cardBody)}>
          {PAID_TIER.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.name}>
                <Icon />
                <Text tag="p" theme="medium">
                  {item.name}
                </Text>
              </li>
            )
          })}
        </ul>
      </div>
      <Wlink className={styles.link} href="/pro" external={false}>
        <Button className={styles.cardBtn}>
          <Text tag="p" theme="medium">
            SIGN UP
          </Text>
        </Button>
      </Wlink>
    </>
  )
}

export default function Card({ border = 'normal', children, ...props }) {
  return (
    <div className={cn(styles.cardWrapper, border)} {...props}>
      {children}
    </div>
  )
}
