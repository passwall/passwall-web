import React from 'react'

import Button, { DownloadButton } from '../components/button'
import Text from '../components/text'

export default {
  title: 'Buttons',
  component: Button,
  subcomponents: { Text }
}

const DownloadTemplate = (args) => (
  <DownloadButton {...args}>{args.children}</DownloadButton>
)
const NormalTempalte = (args) => (
  <Button {...args}>
    <Text>{args.children}</Text>
  </Button>
)

export const normal = NormalTempalte.bind({})
normal.args = {
  children: 'Passwall default button'
}

export const download = DownloadTemplate.bind({})
download.args = {
  disable: false,
  children: 'Windows'
}
