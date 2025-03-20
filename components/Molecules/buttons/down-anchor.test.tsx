import {describe, it, expect} from 'vitest'
import {render, fireEvent} from '@testing-library/react'
import React from 'react'
import DownAnchor from './down-anchor'

describe('DownAnchor', () => {
  it('should navigate to the target section when clicked', () => {
    const href = '#section'
    const {getByRole} = render(<DownAnchor href={href} />)
    const linkElement = getByRole('link')

    fireEvent.click(linkElement)
    expect(linkElement).toHaveAttribute('href', href)
  })

  it('renders an anchor icon with the correct href', () => {
    const href = '#section'
    const {container} = render(<DownAnchor href={href} />)
    const linkElement = container.querySelector('a')
    expect(linkElement).toHaveAttribute('href', href)
  })

  it('applies the correct class names to the icon', () => {
    const href = '#section'
    const {container} = render(<DownAnchor href={href} />)
    const iconElement = container.querySelector('svg')
    expect(iconElement).toHaveClass('text-muted-foreground active:text-primary')
  })
})
