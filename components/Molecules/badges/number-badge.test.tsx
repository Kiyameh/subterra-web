import {render, screen} from '@testing-library/react'
import NumberBadge from './number-badge'
import {describe, it, expect} from 'vitest'

describe('NumberBadge', () => {
  it('renders the badge with the correct number and units', () => {
    render(
      <NumberBadge
        value={123}
        units="kg"
      />
    )
    const badge = screen.getByText('123')
    expect(badge).toBeInTheDocument()
    const units = screen.getByText('kg')
    expect(units).toBeInTheDocument()
  })

  it('renders the badge with the correct string value and units', () => {
    render(
      <NumberBadge
        value="123"
        units="kg"
      />
    )
    const badge = screen.getByText('123')
    expect(badge).toBeInTheDocument()
    const units = screen.getByText('kg')
    expect(units).toBeInTheDocument()
  })

  it('renders the badge without units when units are not provided', () => {
    render(<NumberBadge value={123} />)
    const badge = screen.getByText('123')
    expect(badge).toBeInTheDocument()
    const units = screen.queryByText('kg')
    expect(units).not.toBeInTheDocument()
  })

  it('does not render the badge when value is undefined', () => {
    render(<NumberBadge value={undefined} />)
    const badge = screen.queryByText('123')
    expect(badge).not.toBeInTheDocument()
  })
})
