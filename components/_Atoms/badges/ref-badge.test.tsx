import {render, screen} from '@testing-library/react'
import RefBadge from './ref-badge'
import {describe, it, expect} from 'vitest'
import userEvent from '@testing-library/user-event'

describe('RefBadge', () => {
  it('renders the badge with the correct link and text', () => {
    const value = {name: 'Document Name', _id: '12345'}
    render(
      <RefBadge
        value={value}
        baseUrl="/documents/"
      />
    )
    const link = screen.getByRole('link', {name: /Document Name/i})
    expect(link).toHaveAttribute('href', '/documents/12345')
    const badge = screen.getByText('Document Name')
    expect(badge).toBeInTheDocument()
  })

  it('renders the badge with the correct helper text for type "cave"', async () => {
    const value = {name: 'Cave Name', _id: '12345'}
    render(
      <RefBadge
        value={value}
        baseUrl="/caves/"
        type="cave"
      />
    )
    const badge = screen.getByRole('badge')
    await userEvent.hover(badge)
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveTextContent('Ir a cavidad')
  })

  it('renders the badge with the correct helper text for type "system"', async () => {
    const value = {name: 'System Name', _id: '12345'}
    render(
      <RefBadge
        value={value}
        baseUrl="/systems/"
        type="system"
      />
    )
    const badge = screen.getByRole('badge')
    await userEvent.hover(badge)
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveTextContent('Ir a sistema')
  })

  it('renders the badge with the correct helper text for type "exploration"', async () => {
    const value = {name: 'Exploration Name', _id: '12345'}
    render(
      <RefBadge
        value={value}
        baseUrl="/explorations/"
        type="exploration"
      />
    )
    const badge = screen.getByRole('badge')
    await userEvent.hover(badge)
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveTextContent('Ir a informe de exploración')
  })

  it('renders the badge with the correct helper text for type "group"', async () => {
    const value = {name: 'Group Name', _id: '12345'}
    render(
      <RefBadge
        value={value}
        baseUrl="/groups/"
        type="group"
      />
    )
    const badge = screen.getByRole('badge')
    await userEvent.hover(badge)
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveTextContent('Ir a grupo')
  })

  it('renders the badge with custom showText', () => {
    const value = {name: 'Document Name', _id: '12345'}
    render(
      <RefBadge
        value={value}
        baseUrl="/documents/"
        showText="Custom Text"
      />
    )
    const link = screen.getByRole('link', {name: /Custom Text/i})
    expect(link).toHaveTextContent('Custom Text')
  })

  it('does not render the badge when value is undefined', () => {
    render(
      <RefBadge
        value={undefined}
        baseUrl="/documents/"
      />
    )
    const link = screen.queryByRole('link')
    expect(link).not.toBeInTheDocument()
  })
})
