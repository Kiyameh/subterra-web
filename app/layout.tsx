import type {Metadata} from 'next'
import './globals.css'
import {ThemeProvider} from '@/components/theming/theme-provider'
import {Toaster} from '@/components/ui/sonner'
import {versions} from '@/components/versioning/versions'
import {UpdatesModal} from '@/components/versioning/updates-modal'

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
      <body className="bg-gradient-to-br from-[#11366F] via-[#132034] to-[#000000] bg-no-repeat bg-cover bg-fixed">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
          <UpdatesModal versionData={versions[0]} />
        </ThemeProvider>
      </body>
    </html>
  )
}
