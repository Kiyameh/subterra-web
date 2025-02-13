import {render, screen} from '@testing-library/react'
import OnlineIndicator from './online-indicator'
import {describe, it, expect} from 'vitest'
import userEvent from '@testing-library/user-event'

describe('OnlineIndicator', () => {
  it('renders the indicator with the correct online state', () => {
    render(<OnlineIndicator isOnline={true} />)
    const indicator = screen.getByRole('icon')
    expect(indicator).toHaveClass('bg-success-foreground')
  })

  it('renders the indicator with the correct offline state', () => {
    render(<OnlineIndicator isOnline={false} />)
    const indicator = screen.getByRole('icon')
    expect(indicator).toHaveClass('bg-destructive-foreground')
  })

  it('shows the correct tooltip text when online', async () => {
    render(
      <OnlineIndicator
        isOnline={true}
        onlineText="Online"
      />
    )
    const indicator = screen.getByRole('icon')
    await userEvent.hover(indicator)
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveTextContent('Online')
  })

  it('shows the correct tooltip text when offline', async () => {
    render(
      <OnlineIndicator
        isOnline={false}
        offlineText="Temporalmente Offline"
      />
    )
    const indicator = screen.getByRole('icon')
    await userEvent.hover(indicator)
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveTextContent('Temporalmente Offline')
  })

  it('renders the indicator with custom online and offline texts', async () => {
    render(
      <OnlineIndicator
        isOnline={true}
        onlineText="Connected"
      />
    )
    const indicator = screen.getByRole('icon')
    await userEvent.hover(indicator)
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveTextContent('Connected')
  })
})
