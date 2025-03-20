import {render, screen} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import CardTitle from './card-title'
import {Star} from 'lucide-react'

describe('CardTitle component', () => {
  it('renders the CardTitle component with title', () => {
    render(<CardTitle title="Card Title" />)
    expect(screen.getByText('Card Title')).toBeInTheDocument()
  })

  it('renders the CardTitle component with subtitle', () => {
    render(
      <CardTitle
        title="Card Title"
        subtitle="Card Subtitle"
      />
    )
    expect(screen.getByText('Card Subtitle')).toBeInTheDocument()
  })

  it('renders the CardTitle component with icon', () => {
    render(
      <CardTitle
        title="Card Title"
        icon={<Star data-testid="icon" />}
      />
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('applies the correct className', () => {
    const {container} = render(
      <CardTitle
        title="Card Title"
        className="custom-class"
      />
    )
    expect(container.firstChild?.firstChild).toHaveClass('custom-class')
  })
})
