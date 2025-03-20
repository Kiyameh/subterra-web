import {describe, it, expect, vi, beforeEach} from 'vitest'
import {render, fireEvent} from '@testing-library/react'
import React from 'react'
import FetchingErrorButton from './fetching-error-button'

// Mock useRouter
const refreshMock = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: refreshMock,
  }),
}))

describe('FetchingErrorButton', () => {
  beforeEach(() => {
    refreshMock.mockClear()
  })

  it('calls router.refresh when the refresh button is clicked', () => {
    const {getByRole} = render(<FetchingErrorButton />)
    const button = getByRole('button', {name: 'Recargar datos'})
    fireEvent.click(button)
    expect(refreshMock).toHaveBeenCalledTimes(1)
  })

  it('displays the error message', () => {
    const {getByText} = render(<FetchingErrorButton />)
    expect(getByText('Error al cargar')).toBeInTheDocument()
    expect(getByText('los datos')).toBeInTheDocument()
  })

  it('renders the refresh button', () => {
    const {getByRole} = render(<FetchingErrorButton />)
    const button = getByRole('button', {name: 'Recargar datos'})
    expect(button).toBeInTheDocument()
  })
})
