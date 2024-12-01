'use client'
import * as React from 'react'
import {ThemeProvider as NextThemesProvider} from 'next-themes'

/**
 * @description Proveedor de tema para la aplicación del paquete Next-Themes
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
