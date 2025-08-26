import {render, screen} from '@testing-library/react'
import {describe, it, expect} from 'vitest'

import SquareButton from './square-button'

describe('SquareButton', () => {
  it('renders the button with the correct text', () => {
    render(
      <SquareButton
        icon={<span>Icon</span>}
        text="Click Me"
      />
    )
    const buttonText = screen.getByText('Click Me')
    expect(buttonText).toBeInTheDocument()
  })

  it('renders the button with the correct icon', () => {
    render(
      <SquareButton
        icon={<span>Icon</span>}
        text="Click Me"
      />
    )
    const buttonIcon = screen.getByText('Icon')
    expect(buttonIcon).toBeInTheDocument()
  })

  it('applies the correct default color classes', () => {
    render(
      <SquareButton
        icon={<span>Icon</span>}
        text="Click Me"
      />
    )
    const button = screen.getByRole('button')
    expect(button).toHaveClass('active:bg-primary')
    expect(button).toHaveClass('text-primary')
  })

  it('applies the correct color classes when color prop is provided', () => {
    render(
      <SquareButton
        icon={<span>Icon</span>}
        text="Click Me"
        color="admin"
      />
    )
    const button = screen.getByRole('button')
    expect(button).toHaveClass('active:bg-admin')
    expect(button).toHaveClass('text-admin')
  })
})
