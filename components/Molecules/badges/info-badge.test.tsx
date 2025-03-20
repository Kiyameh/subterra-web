import {render, screen} from '@testing-library/react'
import InfoBadge from './info-badge'
import {describe, it, expect} from 'vitest'
import userEvent from '@testing-library/user-event'

describe('InfoBadge', () => {
  it('renders the badge with the correct label and icon', () => {
    render(
      <InfoBadge
        label="Info"
        description="This is an info badge"
      />
    )
    const badge = screen.getByText('Info')
    expect(badge).toBeInTheDocument()
    const icon = screen.getByRole('icon', {hidden: true})
    expect(icon).toBeInTheDocument()
  })

  it('renders only the icon when label is not provided', () => {
    render(<InfoBadge description="This is an info badge" />)
    const icon = screen.getByRole('icon', {hidden: true})
    expect(icon).toBeInTheDocument()
    const badge = screen.queryByText('Info')
    expect(badge).not.toBeInTheDocument()
  })

  it('shows the tooltip with the correct description on mouse over', async () => {
    render(
      <InfoBadge
        label="Info"
        description="This is an info badge"
      />
    )
    const badge = screen.getByText('Info')
    await userEvent.hover(badge)
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveTextContent('This is an info badge')
  })

  it('applies the correct color class based on the color prop', () => {
    render(
      <InfoBadge
        label="Success"
        color="success"
        description="This is a success badge"
      />
    )
    const icon = screen.getByRole('icon', {hidden: true})
    expect(icon).toHaveClass('text-success-foreground')
  })

  it('renders without crashing when description is provided', () => {
    render(<InfoBadge description="This is an info badge" />)
    const icon = screen.getByRole('icon', {hidden: true})
    expect(icon).toBeInTheDocument()
  })
})
