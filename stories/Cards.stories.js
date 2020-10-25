import React from 'react'

import Card, { FreeCard, PaidCard } from '../components/card'
import { styled } from '@storybook/theming'

export default {
  title: 'Cards'
}
const Container = styled.div(({ theme }) => ({
  width: '30%',
}))

export const free = () => (
  <Container>
    <Card>
      <FreeCard />
    </Card>
  </Container>
)

export const paid = () => (
  <Container>
    <Card>
      <PaidCard />
    </Card>
  </Container>
)
