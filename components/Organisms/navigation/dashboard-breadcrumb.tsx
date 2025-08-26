'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/Atoms/breadcrumb'

/**
 * @version 1
 * @description Breadcumb de navegación para los dashboards
 */
export default function NavigationBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter((part) => part)

  return (
    <Breadcrumb>
      <BreadcrumbList className="hidden md:flex shrink-0">
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
