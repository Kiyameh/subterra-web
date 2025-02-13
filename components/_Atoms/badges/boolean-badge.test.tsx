import {render, screen} from '@testing-library/react'
import BooleanBadge from './boolean-badge'
import {describe, it, expect} from 'vitest'

describe('BooleanBadge', () => {
  it('renders the badge with "Si" when value is true', () => {
    render(<BooleanBadge value={true} />)
    const badge = screen.getByText('Si')
    expect(badge).toBeInTheDocument()
  })

  it('does not render the badge when value is false', () => {
    render(<BooleanBadge value={false} />)
    const badge = screen.queryByText('No')
    expect(badge).not.toBeInTheDocument()
  })

  it('applies the correct success color classes when value is true and invertedColor is false', () => {
    render(
      <BooleanBadge
        value={true}
        invertedColor={false}
      />
    )
    const badge = screen.getByText('Si')
    expect(badge).toHaveClass('text-success-foreground')
    expect(badge).toHaveClass('border-success-foreground')
    expect(badge).toHaveClass('hover:bg-success')
  })

  it('applies the correct destructive color classes when value is true and invertedColor is true', () => {
    render(
      <BooleanBadge
        value={true}
        invertedColor={true}
      />
    )
    const badge = screen.getByText('Si')
    expect(badge).toHaveClass('text-destructive-foreground')
    expect(badge).toHaveClass('border-destructive-foreground')
    expect(badge).toHaveClass('hover:bg-destructive')
  })
})
