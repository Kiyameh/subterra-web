import {render, screen, fireEvent} from '@testing-library/react'
import ResponsiveTooltip from './responsive-tooltip'
import {describe, it, expect} from 'vitest'
import userEvent from '@testing-library/user-event'

describe('ResponsiveTooltip', () => {
  it('renders the tooltip content on hover', async () => {
    render(
      <ResponsiveTooltip content="Tooltip content">
        <button>Hover me</button>
      </ResponsiveTooltip>
    )
    const trigger = screen.getByText('Hover me')
    await userEvent.hover(trigger)
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveTextContent('Tooltip content')
  })

  it('hides the tooltip content when not hovered', async () => {
    render(
      <ResponsiveTooltip content="Tooltip content">
        <button>Hover me</button>
      </ResponsiveTooltip>
    )
    const trigger = screen.getByText('Hover me')
    await userEvent.hover(trigger)
    await userEvent.unhover(trigger)
    const tooltip = screen.queryByRole('tooltip')
    expect(tooltip).not.toBeInTheDocument()
  })

  it('renders the tooltip with the correct color class', async () => {
    render(
      <ResponsiveTooltip
        content="Tooltip content"
        color="success"
      >
        <button>Hover me</button>
      </ResponsiveTooltip>
    )
    const trigger = screen.getByText('Hover me')
    await userEvent.hover(trigger)
    const tooltip = screen.getByRole('tooltip-content')
    expect(tooltip).toHaveClass('bg-success')
  })

  it('shows the tooltip content on touch for 2 seconds', async () => {
    render(
      <ResponsiveTooltip content="Tooltip content">
        <button>Touch me</button>
      </ResponsiveTooltip>
    )
    const trigger = screen.getByText('Touch me')
    fireEvent.touchStart(trigger)
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveTextContent('Tooltip content')
    fireEvent.touchEnd(trigger)
    await new Promise((r) => setTimeout(r, 2000))
    expect(screen.queryByRole('tooltip-content')).not.toBeInTheDocument()
  })
})
