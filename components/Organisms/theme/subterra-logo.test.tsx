import {render} from '@testing-library/react'
import {describe, test, expect} from 'vitest'
import '@testing-library/jest-dom'
import {
  SubterraLogoIcon,
  SubterraLogoSm,
  SubterraLogoMd,
  SubterraLogoLg,
} from './subterra-logo'

describe('SubterraLogo Components', () => {
  test('should render SubterraLogoIcon correctly', () => {
    const {getByAltText} = render(<SubterraLogoIcon />)
    const img = getByAltText('Subterra Logo')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/logos/logo_small_dark.svg')
  })

  test('should render SubterraLogoSm correctly', () => {
    const {getByAltText} = render(<SubterraLogoSm />)
    const img = getByAltText('Subterra Logo')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/logos/logo_small_dark.svg')
  })

  test('should render SubterraLogoMd correctly', () => {
    const {getByAltText} = render(<SubterraLogoMd />)
    const img = getByAltText('Subterra Logo')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/logos/logo_medium_dark.svg')
  })

  test('should render SubterraLogoLg correctly', () => {
    const {getByAltText} = render(<SubterraLogoLg />)
    const img = getByAltText('Subterra Logo')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/logos/logo_big_dark.svg')
  })
})
