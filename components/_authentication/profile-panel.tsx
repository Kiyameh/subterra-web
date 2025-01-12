import {auth} from '@/auth'
import {FullUser, getFullUser} from '@/database/services/user.actions'
import {AdminBadge, EditorBadge} from '@/components/_Atoms/slots/user-slots'
import {TextSlot} from '@/components/_Atoms/slots/text-slots'
import {FaCheck} from 'react-icons/fa'
import ResponsiveTooltip from '@/components/_Atoms/badges/responsive-tooltip'
import Divider from '@/components/_Atoms/boxes/divider'
import {LinkSlot} from '@/components/_Atoms/slots/link-slots'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import FetchingErrorButton from '@/components/_Atoms/buttons/fetching-error-button'
import {getOnePlatform} from '@/database/services/platform.services'
import {PlatformObject} from '@/database/models/Platform.model'
import LinkButton from '../_Atoms/buttons/link-button'

/**
 * @version 1
 * @description Panel de perfil de usuario
 */

export default async function ProfilePanel() {
  const userId = (await auth())?.user._id
  const user: FullUser | undefined = await getFullUser(userId)
  const subterra = (await getOnePlatform('subterra')).content as
    | PlatformObject
    | undefined

  if (!user) return <FetchingErrorButton />

  const {
    name,
    fullname,
    image,
    email,
    memberOf,
    adminOf,
    editorOf,
    coordinatorOf,
  } = user

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Avatar className="w-14 h-14">
          {image && (
            <AvatarImage
              src={image}
              alt="Avatar"
            />
          )}
          <AvatarFallback className="bg-primary">
            {name?.slice(0, 2).toUpperCase() || 'US'}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="space-y-2">
        <TextSlot
          label="Nombre de usuario"
          value={name}
        />
        <TextSlot
          label="Nombre completo"
          value={fullname}
        />
        <TextSlot
          label="Email"
          value={email}
          endAdornment={
            <ResponsiveTooltip content="Email verificado">
              <FaCheck className="text-success-foreground" />
            </ResponsiveTooltip>
          }
        />
      </div>
      <div className="space-y-4 py-4">
        <Divider text="Grupos" />
        <div className="ml-5">
          {memberOf?.length > 0 && (
            <EditorBadge
              label="Miembro"
              helperText="Eres miembro"
            />
          )}
        </div>
        {memberOf.map((group) => (
          <LinkSlot
            key={group.id}
            label={group.fullname}
            value={`/group/${group.name}`}
            type="internal"
            showText="Acceder"
          />
        ))}
        <div className="ml-5">{adminOf?.length > 0 && <AdminBadge />}</div>
        {adminOf.map((group) => (
          <LinkSlot
            key={group.id}
            label={group.fullname}
            value={`/group/${group.name}`}
            type="internal"
            showText="Acceder"
          />
        ))}
        <Divider text="Instancias " />
        <div className="ml-5">
          {editorOf?.length > 0 && <EditorBadge label="Editor" />}
        </div>
        {editorOf.map((instance) => (
          <LinkSlot
            key={instance.id}
            label={instance.fullname}
            value={`/instance/${instance.name}`}
            type="internal"
            showText="Acceder"
          />
        ))}
        <div className="ml-5">
          {coordinatorOf?.length > 0 && (
            <AdminBadge
              label="Coordinador"
              helperText="Eres coordinador"
            />
          )}
        </div>
        {coordinatorOf.map((instance) => (
          <LinkSlot
            key={instance.id}
            label={instance.fullname}
            value={`/instance/${instance.name}`}
            type="internal"
            showText="Acceder"
          />
        ))}
      </div>
      {userId && subterra?.staff.includes(userId) && (
        <LinkButton
          href="/admin"
          label="Administración de subterra"
        />
      )}
    </div>
  )
}
