import React from 'react'
import {render} from '@testing-library/react'
import {describe, it, expect} from 'vitest'
import {Star} from 'lucide-react'
import InfoBox from './info-box'

describe('InfoBox', () => {
  it('renders with default props', () => {
    const {getByText, container} = render(
      <InfoBox title="Default Title">Default Content</InfoBox>
    )
    expect(container.querySelector('.text-info-foreground')).toBeInTheDocument()
    expect(getByText('Default Title')).toBeInTheDocument()
    expect(getByText('Default Content')).toBeInTheDocument()
  })

  it('renders with custom icon and color', () => {
    const {getByText, container} = render(
      <InfoBox
        title="Custom Title"
        color="warning"
        icon={<Star />}
      >
        Custom Content
      </InfoBox>
    )
    expect(
      container.querySelector('.text-warning-foreground')
    ).toBeInTheDocument()
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(getByText('Custom Title')).toBeInTheDocument()
    expect(getByText('Custom Content')).toBeInTheDocument()
  })

  it('applies additional class names', () => {
    const {container} = render(
      <InfoBox
        title="Additional Class"
        className="additional-class"
      />
    )
    expect(container.querySelector('div')).toHaveClass('additional-class')
  })
})
