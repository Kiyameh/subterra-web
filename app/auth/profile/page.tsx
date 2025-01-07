import React, {Suspense} from 'react'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import SkeletonCard from '@/components/_Molecules/cards/skeleton-card'
import {auth} from '@/auth'
import {FullUser, getFullUser} from '@/database/services/user.actions'
import {
  AdminBadge,
  EditorBadge,
  UserProfileCard,
} from '@/components/_Atoms/slots/user-slots'
import {TextSlot} from '@/components/_Atoms/slots/text-slots'
import {User} from 'next-auth'
import {FaCheck} from 'react-icons/fa'
import ResponsiveTooltip from '@/components/_Atoms/badges/responsive-tooltip'
import Divider from '@/components/_Atoms/boxes/divider'
import {LinkSlot} from '@/components/_Atoms/slots/link-slots'

export default async function ProfilePage() {
  return (
    <CardWithHeader cardSubHeader="Perfil">
      <Suspense fallback={<SkeletonCard defaultWidth="sm" />}>
        <ProfilePanel />
      </Suspense>
    </CardWithHeader>
  )
}

export async function ProfilePanel() {
  const userId = (await auth())?.user._id
  const user: FullUser | undefined = await getFullUser(userId)
  return (
    <div className="space-y-4">
      <UserProfileCard user={user as User} />
      <div className="space-y-2">
        <TextSlot
          label="Nombre completo"
          value={user?.fullname}
        />
        <TextSlot
          label="Email"
          value={user?.email}
          endAdornment={
            user?.email_verified && (
              <ResponsiveTooltip content="Email verificado">
                <FaCheck className="text-success-foreground" />
              </ResponsiveTooltip>
            )
          }
        />
        <Divider text="Grupos" />
        <div className="ml-5">
          <EditorBadge
            label="Miembro"
            helperText="Eres miembro"
          />
        </div>
        {user?.memberOf.map((group) => (
          <LinkSlot
            key={group.id}
            label={group.fullname}
            value={`/group/${group.name}`}
            type="internal"
            showText="Acceder"
          />
        ))}
        <div className="ml-5">
          <AdminBadge />
        </div>
        {user?.adminOf.map((group) => (
          <LinkSlot
            key={group.id}
            label={group.fullname}
            value={`/group/${group.name}`}
            type="internal"
            showText="Acceder"
          />
        ))}
        <Divider text="Instancias " />
        {user?.viewerOf.map((instance) => (
          <LinkSlot
            key={instance.id}
            label={instance.fullname}
            value={`/instance/${instance.name}`}
            type="internal"
            showText="Acceder"
          />
        ))}
        <div className="ml-5">
          <EditorBadge label="Editor" />
        </div>
        {user?.editorOf.map((instance) => (
          <LinkSlot
            key={instance.id}
            label={instance.fullname}
            value={`/instance/${instance.name}`}
            type="internal"
            showText="Acceder"
          />
        ))}
        <div className="ml-5">
          <AdminBadge
            label="Coordinador"
            helperText="Eres coordinador"
          />
        </div>
        {user?.coordinatorOf.map((instance) => (
          <LinkSlot
            key={instance.id}
            label={instance.fullname}
            value={`/instance/${instance.name}`}
            type="internal"
            showText="Acceder"
          />
        ))}
      </div>
    </div>
  )
}
