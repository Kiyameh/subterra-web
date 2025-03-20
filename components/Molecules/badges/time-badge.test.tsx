import {render, screen, fireEvent} from '@testing-library/react'
import TimeBadge from './time-badge'
import {describe, it, expect} from 'vitest'

describe('TimeBadge', () => {
  it('renders the badge with initial time in minutes', () => {
    render(<TimeBadge valueInSeconds={120} />)
    const badge = screen.getByText('2')
    const unit = screen.getByText('mins')
    expect(badge).toBeInTheDocument()
    expect(unit).toBeInTheDocument()
  })

  it('changes time unit to hours on click', () => {
    render(<TimeBadge valueInSeconds={3600} />)
    const badge = screen.getByText('60')
    fireEvent.click(badge)
    const newBadge = screen.getByText('1')
    const newUnit = screen.getByText('hrs')
    expect(newBadge).toBeInTheDocument()
    expect(newUnit).toBeInTheDocument()
  })

  it('changes time unit to seconds on second click', () => {
    render(<TimeBadge valueInSeconds={3600} />)
    const badge = screen.getByText('60')
    fireEvent.click(badge) // Change to hours
    fireEvent.click(badge) // Change to seconds
    const newBadge = screen.getByText('3600')
    const newUnit = screen.getByText('sec')
    expect(newBadge).toBeInTheDocument()
    expect(newUnit).toBeInTheDocument()
  })

  it('changes time unit back to minutes on third click', () => {
    render(<TimeBadge valueInSeconds={3600} />)
    const badge = screen.getByText('60')
    fireEvent.click(badge) // Change to hours
    fireEvent.click(badge) // Change to seconds
    fireEvent.click(badge) // Change back to minutes
    const newBadge = screen.getByText('60')
    const newUnit = screen.getByText('mins')
    expect(newBadge).toBeInTheDocument()
    expect(newUnit).toBeInTheDocument()
  })
})
