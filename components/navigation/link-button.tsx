import Link from 'next/link'
import {Button, ButtonProps} from '../ui/button'

interface LinkButtonProps extends ButtonProps {
  label: string
  href?: string
}
/** Unión de Link de Next y button de Shadcn */
export default function LinkButton({label, href, ...props}: LinkButtonProps) {
  return (
    <Link
      href={href || ''}
      style={{
        placeSelf: 'center',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Button {...props}>{label}</Button>
    </Link>
  )
}
