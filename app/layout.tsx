import type {Metadata} from 'next'
import './globals.css'
import {ThemeProvider} from '@/components/theming/theme-provider'

export const metadata: Metadata = {
  title: 'Subterra.app',
  description: 'Aplicación de base de datos para el mundo subterráneo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
    >
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
