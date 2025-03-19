import React from 'react'
import {render} from '@testing-library/react'
import {describe, it, expect} from 'vitest'
import {Answer} from '@/database/types/Answer.type'
import DbAwnserBox from './db-answer-box'

const mockAnswers: Answer[] = [
  {
    ok: true,
    message: 'Success message',
    code: 200,
    content: {data: 'Success data'},
  },
  {
    ok: false,
    message: 'Error message',
    code: 400,
    error: {details: 'Error details'},
  },
]

describe('DbAwnserBox', () => {
  it('renders null when no answer is provided', () => {
    const {container} = render(<DbAwnserBox answer={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders success message correctly', () => {
    const {getByText, container} = render(
      <DbAwnserBox answer={mockAnswers[0]} />
    )
    expect(container.querySelector('.bg-success')).toBeInTheDocument()
    expect(
      container.querySelector('.text-success-foreground')
    ).toBeInTheDocument()
    expect(getByText('Success message')).toBeInTheDocument()
  })

  it('renders error message correctly', () => {
    const {getByText, container} = render(
      <DbAwnserBox answer={mockAnswers[1]} />
    )
    expect(container.querySelector('.bg-destructive')).toBeInTheDocument()
    expect(
      container.querySelector('.text-destructive-foreground')
    ).toBeInTheDocument()
    expect(getByText('Error message')).toBeInTheDocument()
  })
})
