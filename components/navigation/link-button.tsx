import Link from 'next/link'
import {Button, ButtonProps} from '../ui/button'

interface LinkButtonProps extends ButtonProps {
  label: string
  href?: string | null | undefined
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
    <Link
      href={href || ''}
      className={disabled ? 'pointer-events-none w-fit' : 'w-fit'}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Button
        {...props}
        disabled={disabled}
      >
        {label}
      </Button>
    </Link>
  )
}
