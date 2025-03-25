import React from 'react'
import {describe, it, expect} from 'vitest'
import {render} from '@testing-library/react'

import {type FieldErrors} from 'react-hook-form'
import ReactHookFormErrorBox from './rhf-error-box'

const mockErrors: FieldErrors = {
  name: {
    type: 'required',
    message: 'Name is required',
  },
  email: {
    type: 'pattern',
    message: 'Invalid email format',
  },
  nested: {
    field: {
      type: 'minLength',
      message: 'Minimum length is 3',
    },
  },
}

describe('ReactHookFormErrorBox', () => {
  it('renders error messages correctly', () => {
    const {getByText} = render(<ReactHookFormErrorBox errors={mockErrors} />)

    expect(getByText('name : Name is required')).toBeTruthy()
    expect(getByText('email : Invalid email format')).toBeTruthy()
    expect(getByText('nested.field : Minimum length is 3')).toBeTruthy()
  })

  it('renders no messages when errors are empty', () => {
    const emptyErrors: FieldErrors = {}
    const {container} = render(<ReactHookFormErrorBox errors={emptyErrors} />)

    expect(container.firstChild).toBeEmptyDOMElement()
  })
})
