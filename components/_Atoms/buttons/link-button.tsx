import Link from 'next/link'
import {Button, ButtonProps} from '../../ui/button'

interface LinkButtonProps extends ButtonProps {
  label: string
  href: string
  disabled?: boolean
}
/** Unión de Link de Next y button de Shadcn */
export default function LinkButton({
  label,
  href,
  disabled,
  ...props
}: LinkButtonProps) {
  return (
    <Button
      asChild
      disabled={disabled}
      {...props}
    >
      <Link
        href={href}
        className={disabled ? 'pointer-events-none w-full' : 'w-full'}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        style={{
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        {label}
      </Link>
    </Button>
  )
}
