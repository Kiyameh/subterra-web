import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {describe, it, expect} from 'vitest'

import CollapsibleBox from './collapsible-box'
import {Star} from 'lucide-react'

describe('CollapsibleBox', () => {
  it('renders correctly with default props', () => {
    const {getByText} = render(
      <CollapsibleBox title="Default Title">Default Content</CollapsibleBox>
    )
    expect(getByText('Default Title')).toBeInTheDocument()
  })

  it('renders correctly with custom icon and color', () => {
    const {container, getByText} = render(
      <CollapsibleBox
        title="Custom Title"
        color="warning"
        icon={<Star />}
      >
        Custom Content
      </CollapsibleBox>
    )
    const icon = container.querySelector('.text-warning-foreground')
    expect(icon).toBeInTheDocument()
    expect(getByText('Custom Title')).toBeInTheDocument()
  })

  it('toggles content on click', () => {
    const {getByText, queryByText} = render(
      <CollapsibleBox title="Toggle Title">Toggle Content</CollapsibleBox>
    )
    const titleElement = getByText('Toggle Title')
    fireEvent.click(titleElement)
    expect(getByText('Toggle Content')).toBeInTheDocument()
    fireEvent.click(titleElement)
    expect(queryByText('Toggle Content')).not.toBeInTheDocument()
  })
})
