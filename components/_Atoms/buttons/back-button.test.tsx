import {render, screen, fireEvent} from '@testing-library/react'
import {describe, expect, it, Mock, vi} from 'vitest'
import {useRouter} from 'next/navigation'
import BackButton from './back-button'

// Mock useRouter
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

describe('BackButton', () => {
  it('should navigate back when clicked', () => {
    const mockRouter = {
      back: vi.fn(),
    }
    const useRouterMock = useRouter as Mock
    useRouterMock.mockReturnValue(mockRouter)

    render(<BackButton />)
    fireEvent.click(screen.getByRole('button'))

    expect(mockRouter.back).toHaveBeenCalledTimes(1)
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
