import React from 'react'
import {render} from '@testing-library/react'
import {describe, it, expect} from 'vitest'
import Divider from './divider'

describe('Divider', () => {
  it('renders without text', () => {
    const {container} = render(<Divider />)
    expect(container.querySelector('.border-t')).toBeInTheDocument()
    expect(container.querySelector('span')).not.toBeInTheDocument()
  })

  it('renders with text', () => {
    const {getByText, container} = render(<Divider text="Optional Text" />)
    expect(container.querySelector('.border-t')).toBeInTheDocument()
    expect(getByText('Optional Text')).toBeInTheDocument()
    expect(
      container.querySelector('.text-muted-foreground')
    ).toBeInTheDocument()
  })
})
