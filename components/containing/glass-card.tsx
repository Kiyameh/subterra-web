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

interface GlassCardProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  content:
    | string
    | React.ReactNode
    | React.ReactNode[]
    | (string | React.ReactNode)[]
  footer?: React.ReactNode
  className?: string
}

export default function GlassCard({
  title,
  description,
  icon,
  content,
  footer,
  className,
}: GlassCardProps) {
  return (
    <Card
      className={cn(
        'max-w-md bg-black bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30',
        className
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <CardContent>{content}</CardContent>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
