'use client'
import {usePathname} from 'next/navigation'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

/**
 * @version 1
 * @description Breadcumb de navegación para los dashboards
 */
export default function NavigationBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter((part) => part)

  return (
    <Breadcrumb>
      <BreadcrumbList className="hidden md:flex">
        {segments.map((part, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/')

          return (
            <div
              key={index}
              className="flex items-center space-x-2"
            >
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href={href}>{part.length > 12 ? '[doc]' : part}</Link>
              </BreadcrumbItem>
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
