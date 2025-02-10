import {expect, test, describe} from 'vitest'
import {render, screen} from '@testing-library/react'
import WelcomeSection from '@/app/(landing)/welcome-section'

describe('WelcomeSection', () => {
  test('renders SubterraLogo component', () => {
    render(<WelcomeSection />)
    expect(screen.getByAltText('Subterra Logo')).toBeDefined()
  })

  test('renders SimpleBox component', () => {
    render(<WelcomeSection />)
    expect(
      screen.getByText(
        'Base de datos para el almacenamiento de información espeleológica y de exploración'
      )
    ).toBeDefined()
  })

  test('renders DownAnchor component', () => {
    render(<WelcomeSection />)
    expect(screen.getByRole('link', {name: /down/i})).toBeDefined()
  })
})
