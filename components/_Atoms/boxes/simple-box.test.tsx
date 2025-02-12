import {describe, it, expect} from 'vitest'
import {render} from '@testing-library/react'
import React from 'react'
import SimpleBox from './simple-box'

describe('SimpleBox', () => {
  it('renders children correctly', () => {
    const {getByText} = render(<SimpleBox>Test Content</SimpleBox>)
    expect(getByText('Test Content')).toBeTruthy()
  })

  it('applies default width class correctly', () => {
    const {container} = render(<SimpleBox>Test Content</SimpleBox>)
    expect(container.firstChild).toHaveClass('w-[460px]')
  })

  it('applies glassmorphism class correctly', () => {
    const {container} = render(
      <SimpleBox glassmorphism={true}>Test Content</SimpleBox>
    )
    expect(container.firstChild).toHaveClass(
      'bg-black bg-opacity-50 backdrop-blur-sm'
    )
  })

  it('applies custom className correctly', () => {
    const {container} = render(
      <SimpleBox className="custom-class">Test Content</SimpleBox>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('applies different width classes based on defaultWidth prop', () => {
    const {container, rerender} = render(
      <SimpleBox defaultWidth="lg">Test Content</SimpleBox>
    )
    expect(container.firstChild).toHaveClass('w-[600px]')

    rerender(<SimpleBox defaultWidth="xl">Test Content</SimpleBox>)
    expect(container.firstChild).toHaveClass('w-[940px]')

    rerender(<SimpleBox defaultWidth="xxl">Test Content</SimpleBox>)
    expect(container.firstChild).toHaveClass('w-[1220px]')
  })
})
