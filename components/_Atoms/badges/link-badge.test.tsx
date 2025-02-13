import {render, screen} from '@testing-library/react'
import LinkBadge from './link-badge'
import {describe, it, expect} from 'vitest'
import userEvent from '@testing-library/user-event'

describe('LinkBadge', () => {
  it('renders the badge with the correct email link and icon', () => {
    render(
      <LinkBadge
        value="test@example.com"
        type="email"
      />
    )
    const link = screen.getByRole('link', {name: /test@example.com/i})
    expect(link).toHaveAttribute('href', 'mailto:test@example.com')
    const icon = screen.getByRole('icon', {hidden: true})
    expect(icon).toBeInTheDocument()
  })

  it('renders the badge with the correct phone link and icon', () => {
    render(
      <LinkBadge
        value="+1234567890"
        type="phone"
      />
    )
    const link = screen.getByRole('link', {name: /\+1234567890/i})
    expect(link).toHaveAttribute('href', 'tel:+1234567890')
    const icon = screen.getByRole('icon', {hidden: true})
    expect(icon).toBeInTheDocument()
  })

  it('renders the badge with the correct internal link and icon', () => {
    render(
      <LinkBadge
        value="/internal-page"
        type="internal"
      />
    )
    const link = screen.getByRole('link', {name: /\/internal-page/i})
    expect(link).toHaveAttribute('href', '/internal-page')
    const icon = screen.getByRole('icon', {hidden: true})
    expect(icon).toBeInTheDocument()
  })

  it('renders the badge with the correct external link and icon', () => {
    render(
      <LinkBadge
        value="example.com"
        type="external"
      />
    )
    const link = screen.getByRole('link', {name: /example.com/i})
    expect(link).toHaveAttribute('href', 'https://example.com')
    const icon = screen.getByRole('icon', {hidden: true})
    expect(icon).toBeInTheDocument()
  })

  it('shows the tooltip with the correct href on mouse over', async () => {
    render(
      <LinkBadge
        value="example.com"
        type="external"
        showText="Visit Example"
      />
    )
    const badge = screen.getByRole('badge')
    await userEvent.hover(badge)

    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveTextContent('https://example.com')
  })

  it('renders the badge with the correct showText', () => {
    render(
      <LinkBadge
        value="example.com"
        type="external"
        showText="Visit Example"
      />
    )
    const link = screen.getByRole('link', {name: /Visit Example/i})
    expect(link).toHaveTextContent('Visit Example')
  })
})
