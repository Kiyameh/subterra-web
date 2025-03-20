import {render, fireEvent} from '@testing-library/react'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import BackButton from './back-button'

// Mock useRouter
const backMock = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: backMock,
  }),
}))

describe('BackButton', () => {
  beforeEach(() => {
    backMock.mockClear()
  })

  it('navigate back when clicked', () => {
    const {getByRole} = render(<BackButton />)
    const button = getByRole('button', {name: 'Volver'})
    fireEvent.click(button)
    expect(backMock).toHaveBeenCalledTimes(1)
  })

  it('renders the button correctly with default size', () => {
    const {getByText} = render(<BackButton />)
    const button = getByText('Volver')
    expect(button).toBeInTheDocument()
  })

  it('applies additional classes and size correctly', () => {
    const {container} = render(
      <BackButton
        className="extra-class"
        size="sm"
      />
    )
    const button = container.querySelector('.extra-class')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('w-20')
  })

  it('renders only icon when size is "icon"', () => {
    const {container} = render(<BackButton size="icon" />)
    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
    expect(container.querySelector('span')).not.toBeInTheDocument()
  })
})
