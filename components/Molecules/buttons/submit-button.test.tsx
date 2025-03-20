import {render, screen} from '@testing-library/react'
import SubmitButton from './submit-button'
import {describe, it, expect} from 'vitest'

describe('SubmitButton', () => {
  it('renders the button with the default label', () => {
    render(<SubmitButton isPending={false} />)
    const button = screen.getByRole('button', {name: 'Enviar'})
    expect(button).toBeInTheDocument()
  })

  it('renders the button with the provided label', () => {
    render(
      <SubmitButton
        isPending={false}
        label="Submit"
      />
    )
    const button = screen.getByRole('button', {name: 'Submit'})
    expect(button).toBeInTheDocument()
  })

  it('displays the loader when isPending is true', () => {
    render(<SubmitButton isPending={true} />)
    const loader = screen.getByLabelText('Cargando')
    expect(loader).toBeInTheDocument()
    expect(loader).toHaveClass('animate-spin')
  })

  it('disables the button when isPending is true', () => {
    render(<SubmitButton isPending={true} />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('enables the button when isPending is false', () => {
    render(<SubmitButton isPending={false} />)
    const button = screen.getByRole('button')
    expect(button).not.toBeDisabled()
  })
})
