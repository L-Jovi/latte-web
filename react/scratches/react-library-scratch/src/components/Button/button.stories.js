import React from 'react'
import Button from './index.js'
import { withKnobs, text } from '@storybook/addon-knobs'

export default { title: 'Button component', decorators: [withKnobs]}

export const button = () => {
  const message = text('Text', 'I am rendered from storybook!')
  return <Button message={message}></Button>
}
