import {render, screen} from '@testing-library/react'
import {describe, it, expect} from 'vitest'
import userEvent from '@testing-library/user-event'

import {format} from 'date-fns'
import {es} from 'date-fns/locale'

import DateBadge from './date-badge'

describe('DateBadge', () => {
  it('renders the badge with the correct formatted date', () => {
    const date = new Date(2023, 9, 10) // 10th October 2023
    render(<DateBadge value={date} />)
    const formattedDate = format(date, 'd MMM yy', {locale: es})
    const badge = screen.getByText(formattedDate)
    expect(badge).toBeInTheDocument()
  })

  it('shows the tooltip with the correct full date on mouse over', async () => {
    const date = new Date(2023, 9, 10) // 10th October 2023
    render(<DateBadge value={date} />)
    const badge = screen.getByText(format(date, 'd MMM yy', {locale: es}))
    await userEvent.hover(badge)
    const fullDate = format(date, 'd MMMM y, EEEE', {locale: es})
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveTextContent(fullDate)
  })

  it('hides the tooltip when not hovered', async () => {
    const date = new Date(2023, 9, 10) // 10th October 2023
    render(<DateBadge value={date} />)
    const badge = screen.getByText(format(date, 'd MMM yy', {locale: es}))
    await userEvent.unhover(badge)
    const fullDate = format(date, 'd MMMM y, EEEE', {locale: es})
    const tooltip = screen.queryByText(fullDate)
    expect(tooltip).not.toBeInTheDocument()
  })

  it('does not render the badge when value is undefined', () => {
    render(<DateBadge value={undefined} />)
    const badge = screen.queryByRole('badge')
    expect(badge).not.toBeInTheDocument()
  })
})
