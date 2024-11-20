import React from 'react'
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {cn} from '@/lib/utils'

interface SolidCardProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  content?:
    | string
    | React.ReactNode
    | React.ReactNode[]
    | (string | React.ReactNode)[]
  footer?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export default function SolidCard({
  title,
  description,
  icon,
  content,
  footer,
  className,
  children,
}: SolidCardProps) {
  return (
    <Card className={cn('max-w-md', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
        <CardContent>{content}</CardContent>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
