import type {Metadata} from 'next'
import './globals.css'

import {versions} from '@/database/data/versions'
import {features} from '@/database/data/features'

import {Toaster} from '@/components/Atoms/sonner'
import {ThemeProvider} from '@/components/Organisms/theme/theme-provider'
import {UpdatesModal} from '@/components/Templates/versions-board/updates-modal'

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
          <UpdatesModal
            versions={versions}
            features={features}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
