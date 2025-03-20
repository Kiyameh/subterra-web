import React from 'react'
import {render} from '@testing-library/react'
import {describe, it, expect} from 'vitest'
import {Star} from 'lucide-react'
import HeaderBox from './header-box'

describe('HeaderBox', () => {
  it('renders without icon and with text', () => {
    const {getByText, container} = render(<HeaderBox text="Section Title" />)
    expect(getByText('Section Title')).toBeInTheDocument()
    expect(container.querySelector('h2')).toHaveClass('text-lg')
  })

  it('renders with icon and text', () => {
    const {getByText, container} = render(
      <HeaderBox
        text="Section Title"
        icon={<Star data-testid="lucide-star" />}
      />
    )
    expect(getByText('Section Title')).toBeInTheDocument()
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(container.querySelector('svg')).toHaveAttribute(
      'data-testid',
      'lucide-star'
    )
    expect(container.querySelector('h2')).toHaveClass('text-lg')
  })

  it('applies additional class names', () => {
    const {container} = render(
      <HeaderBox
        text="Section Title"
        className="additional-class"
      />
    )
    expect(container.querySelector('div')).toHaveClass('additional-class')
  })
})
