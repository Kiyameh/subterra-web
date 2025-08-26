import Link from 'next/link'
import {versions} from '@/database/data/versions'

import {Button} from '@/components/Atoms/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/Atoms/dropdown-menu'

import {GrContact} from 'react-icons/gr'
import {GrHelpBook} from 'react-icons/gr'
import {MdOutlineTextSnippet} from 'react-icons/md'
import {MdOutlineCookie} from 'react-icons/md'
import {PiAvocadoFill} from 'react-icons/pi'
import {MdOutlinePrivacyTip} from 'react-icons/md'
import {Menu} from 'lucide-react'

/**
 * @version 2
 * @description Dropdown de navegación principal de la plataforma con icono de apertura
 */

export default function SubterraDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
        >
          <Menu className="scale-125" />
          <span className="sr-only">Abrir menú principal</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <Link href="/">
            <DropdownMenuItem className="cursor-pointer">
              Inicio
            </DropdownMenuItem>
          </Link>
          <Link href="/instance">
            <DropdownMenuItem className="cursor-pointer">
              Instancias
            </DropdownMenuItem>
          </Link>
          <Link href="/group">
            <DropdownMenuItem className="cursor-pointer">
              Grupos
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/guide">
            <DropdownMenuItem className="justify-between px-2 cursor-pointer">
              Guía de uso
              <GrHelpBook className="text-muted-foreground" />
            </DropdownMenuItem>
          </Link>
          <Link href="/contact">
            <DropdownMenuItem className="justify-between px-2 cursor-pointer">
              Contacto
              <GrContact className="text-muted-foreground" />
            </DropdownMenuItem>
          </Link>

          <Link href="/terms-of-service">
            <DropdownMenuItem className="justify-between px-2 cursor-pointer">
              Términos y condiciones
              <MdOutlineTextSnippet className="text-muted-foreground" />
            </DropdownMenuItem>
          </Link>

          <Link href="/cookie-policy">
            <DropdownMenuItem className="justify-between px-2 cursor-pointer">
              Lo de las cookies
              <MdOutlineCookie className="text-muted-foreground" />
            </DropdownMenuItem>
          </Link>

          <Link href="/privacy-policy">
            <DropdownMenuItem className="justify-between px-2 cursor-pointer">
              Política de privacidad
              <MdOutlinePrivacyTip className="text-muted-foreground" />
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2 space-y-2">
          <div className="flex items-center gap-1 text-sm">
            <PiAvocadoFill className="text-staff text-xl" />
            <div>
              <p>Subterra.app</p>
              <p className="text-xs">
                By <span className="text-staff">@AndoniAbarzuza</span>
              </p>
            </div>
          </div>

          <p>{`Estas viendo la versión ${versions[0].version}`}</p>
          <p>¿Quieres ver las proximas novedades?</p>
          <Link href="/versions">
            <Button
              size="sm"
              variant="link"
              className="w-full"
            >
              Versiones
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
