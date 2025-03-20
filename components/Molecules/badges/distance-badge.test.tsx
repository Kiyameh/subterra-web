import {render, screen, fireEvent} from '@testing-library/react'
import {describe, it, expect} from 'vitest'
import DistanceBadge from './distance-badge'
import React from 'react'

describe('DistanceBadge', () => {
  it('should display the distance in meters by default', () => {
    render(<DistanceBadge valueInMeters={500} />)
    expect(screen.getByText('500')).toBeInTheDocument()
    expect(screen.getByText('m')).toBeInTheDocument()
  })

  it('should toggle distance units when clicked', () => {
    render(<DistanceBadge valueInMeters={500} />)
    const badge = screen.getByText('500')

    // Click to change to kilometers
    fireEvent.click(badge)
    expect(screen.getByText('0,5')).toBeInTheDocument()
    expect(screen.getByText('km')).toBeInTheDocument()

    // Click to change to centimeters
    fireEvent.click(badge)
    expect(screen.getByText('50.000')).toBeInTheDocument()
    expect(screen.getByText('cm')).toBeInTheDocument()

    // Click to change back to meters
    fireEvent.click(badge)
    expect(screen.getByText('500')).toBeInTheDocument()
    expect(screen.getByText('m')).toBeInTheDocument()
  })

  it('should not toggle distance units if fixedUnits is true', () => {
    render(
      <DistanceBadge
        valueInMeters={500}
        fixedUnits
      />
    )
    const badge = screen.getByText('500')

    // Click should not change units
    fireEvent.click(badge)
    expect(screen.getByText('500')).toBeInTheDocument()
    expect(screen.getByText('m')).toBeInTheDocument()
  })

  it('should render without crashing when valueInMeters is undefined', () => {
    render(<DistanceBadge valueInMeters={undefined} />)
    expect(screen.queryByText('m')).not.toBeInTheDocument()
    expect(screen.queryByText('km')).not.toBeInTheDocument()
    expect(screen.queryByText('cm')).not.toBeInTheDocument()
  })
})
