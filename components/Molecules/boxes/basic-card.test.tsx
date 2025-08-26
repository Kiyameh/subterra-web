import {describe, expect, it} from 'vitest'
import {render, screen} from '@testing-library/react'

import unauthorizedImage from '@/public/401.webp'
import BasicCard from './basic-card'

describe('BasicCard component', () => {
  it('renders the BasicCard component with children', () => {
    render(
      <BasicCard>
        <p>Content of the card</p>
      </BasicCard>
    )
    expect(screen.getByText('Content of the card')).toBeInTheDocument()
  })

  it('renders the BasicCard component with header and footer', () => {
    render(
      <BasicCard
        cardHeader={<p>Header Content</p>}
        cardFooter={<p>Footer Content</p>}
      >
        <p>Content of the card</p>
      </BasicCard>
    )
    expect(screen.getByText('Header Content')).toBeInTheDocument()
    expect(screen.getByText('Footer Content')).toBeInTheDocument()
  })

  it('renders the BasicCard component with image', () => {
    render(
      <BasicCard image={unauthorizedImage}>
        <p>Content of the card</p>
      </BasicCard>
    )
    const imgElement = screen.getByRole('img')
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute(
      'src',
      expect.stringContaining('401.webp')
    )
  })

  it('applies glassmorphism effect when glassmorphism is true', () => {
    const {container} = render(
      <BasicCard glassmorphism>
        <p>Content of the card</p>
      </BasicCard>
    )
    expect(container.firstChild).toHaveClass(
      'bg-black bg-opacity-50 backdrop-blur-sm'
    )
  })

  it('applies the correct default width class based on the defaultWidth prop', () => {
    const {container} = render(
      <BasicCard defaultWidth="xl">
        <p>Content of the card</p>
      </BasicCard>
    )
    expect(container.firstChild).toHaveClass('w-[940px] max-w-[90vw]')
  })
})
