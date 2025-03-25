import {render, screen} from '@testing-library/react'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import CardWithHeader from './card-with-header'

// Mock useRouter
const backMock = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: backMock,
  }),
}))

describe('CardWithHeader', () => {
  beforeEach(() => {
    backMock.mockClear()
  })

  it('renders the CardWithHeader component with children', () => {
    render(
      <CardWithHeader>
        <p>Content of the card</p>
      </CardWithHeader>
    )
    expect(screen.getByText('Content of the card')).toBeInTheDocument()
  })

  it('renders the CardWithHeader component with header and footer', () => {
    render(
      <CardWithHeader
        cardSubHeader={<p>Header Content</p>}
        cardFooter={<p>Footer Content</p>}
      >
        <p>Content of the card</p>
      </CardWithHeader>
    )
    expect(screen.getByText('Header Content')).toBeInTheDocument()
    expect(screen.getByText('Footer Content')).toBeInTheDocument()
  })

  it('renders the CardWithHeader component with SubterraLogoMd and BackButton', () => {
    render(
      <CardWithHeader>
        <p>Content of the card</p>
      </CardWithHeader>
    )
    expect(screen.getByAltText('Subterra Logo')).toBeInTheDocument()
    expect(screen.getByText('Volver')).toBeInTheDocument()
  })

  it('applies glassmorphism effect when glassmorphism is true', () => {
    const {container} = render(
      <CardWithHeader glassmorphism>
        <p>Content of the card</p>
      </CardWithHeader>
    )
    expect(container.firstChild).toHaveClass(
      'bg-black bg-opacity-50 backdrop-blur-sm'
    )
  })

  it('applies the correct default width class based on the defaultWidth prop', () => {
    const {container} = render(
      <CardWithHeader defaultWidth="xl">
        <p>Content of the card</p>
      </CardWithHeader>
    )
    expect(container.firstChild).toHaveClass('w-[940px] max-w-[90vw]')
  })
})
