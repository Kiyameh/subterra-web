import {SubterraLogoIcon} from '@/components/branding/subterra-logo'
import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

import {GrContact} from 'react-icons/gr'
import {GrHelpBook} from 'react-icons/gr'
import {MdOutlineTextSnippet} from 'react-icons/md'
import {MdOutlineCookie} from 'react-icons/md'
import {PiAvocadoFill} from 'react-icons/pi'
import {MdOutlinePrivacyTip} from 'react-icons/md'

/**
 * @version 1
 * @description Dropdown de navegación principal de la plataforma con icono de apertura
 */

export default function SubterraDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={
            'flex items-center hover:bg-primary hover:bg-opacity-10 transition-colors ease-linear p-1 px-2 rounded-md cursor-pointer'
          }
        >
          <SubterraLogoIcon />
        </div>
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
          <Link href="/user-guide">
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

          <p>Estas viendo la versión 1.0.0</p>
          <p>¿Quieres ver las proximas novedades?</p>
          <Link href="/next">
            <Button
              size="sm"
              variant="ghost"
              className="w-full"
            >
              Lo que se viene
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
