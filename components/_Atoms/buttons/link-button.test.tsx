import {render, screen} from '@testing-library/react'
import {describe, it, expect} from 'vitest'
import LinkButton from './link-button'

describe('LinkButton', () => {
  it('renders the button with the correct label', () => {
    render(
      <LinkButton
        label="Click Me"
        href="/test"
      />
    )
    const button = screen.getByText('Click Me')
    expect(button).toBeInTheDocument()
  })

  it('renders the link with the correct href', () => {
    render(
      <LinkButton
        label="Click Me"
        href="/test"
      />
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test')
  })

  it('applies the disabled state correctly', () => {
    render(
      <LinkButton
        label="Click Me"
        href="/test"
        disabled
      />
    )
    const link = screen.getByRole('link')
    expect(link).toHaveClass('pointer-events-none')
    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).toHaveAttribute('tabIndex', '-1')
  })

  it('does not apply the disabled state when not disabled', () => {
    render(
      <LinkButton
        label="Click Me"
        href="/test"
      />
    )
    const link = screen.getByRole('link')
    expect(link).not.toHaveClass('pointer-events-none')
    expect(link).not.toHaveAttribute('aria-disabled')
    expect(link).not.toHaveAttribute('tabIndex')
  })
})
