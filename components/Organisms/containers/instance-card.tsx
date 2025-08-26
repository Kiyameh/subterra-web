import React from 'react'
import Link from 'next/link'
import {InstanceWithOwner} from '@/database/services/Instance/getAllInstances'

import {CardDescription, CardTitle} from '@/components/Atoms/card'
import LinkButton from '@/components/Molecules/buttons/link-button'
import InfoBadge from '@/components/Molecules/badges/info-badge'
import OnlineIndicator from '@/components/Molecules/badges/online-indicator'
import BasicCard from '@/components/Molecules/boxes/basic-card'

import {MdOutlineTravelExplore} from 'react-icons/md'
import {RiAdminLine} from 'react-icons/ri'
import {MdVisibility} from 'react-icons/md'
import {MdModeEdit} from 'react-icons/md'
import {MdMoreTime} from 'react-icons/md'
import {HiLink} from 'react-icons/hi'
import {LuBox} from 'react-icons/lu'

/**
 * @version 1
 * @description Card personalizada para mostrar una instancia
 * @param instance Instancia a mostrar
 * @param glassmorphism Efecto de vidrio
 * @param className Clases extra
 */

export default function InstanceCard({
  instance,
  glassmorphism = false,
  className,
}: {
  instance: InstanceWithOwner
  glassmorphism?: boolean
  className?: string
}) {
  const {
    name,
    is_online,
    territory,
    owner,
    public_visibility,
    public_edition,
    fullname,
    description,
    createdAt,
  } = instance

  const cardHeader = (
    <>
      <div className="flex justify-between items-center gap-6">
        <div>
          <div className="flex items-center gap-2">
            <OnlineIndicator isOnline={is_online} />
            <CardTitle>{fullname}</CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-primary text-xl">
            <LuBox />
          </span>
          <span className="text-muted-foreground">Instancia</span>
        </div>
      </div>
    </>
  )
  const cardFooter = (
    <LinkButton
      href={`/instance/${name}`}
      label="Acceder"
      disabled={!instance.is_online}
    />
  )

  return (
    <BasicCard
      className={className}
      defaultWidth="sm"
      glassmorphism={glassmorphism}
      cardHeader={cardHeader}
      cardFooter={cardFooter}
    >
      {territory && (
        <div className="flex items-center gap-2">
          <MdOutlineTravelExplore />
          {territory}
        </div>
      )}

      {owner && (
        <Link
          className="flex items-center gap-2"
          href={`/group/${owner.name}`}
        >
          <RiAdminLine />
          {owner.fullname}
          <HiLink className="text-primary" />
        </Link>
      )}

      <div className="flex items-center gap-2">
        <MdVisibility />
        Visibilidad:{' '}
        {public_visibility ? (
          <InfoBadge
            label="Pública"
            description="Cualquier persona puede ver"
          />
        ) : (
          <InfoBadge
            label="Miembros"
            color="warning"
            description="Solo miembros del grupo"
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        <MdModeEdit />
        Edición:{' '}
        {public_edition ? (
          <InfoBadge
            label="Solo registrados"
            description="Solo usarios registrados en Subterra"
          />
        ) : (
          <InfoBadge
            label="Privada"
            color="warning"
            description="Solo usuarios autorizados"
          />
        )}
      </div>
      {createdAt && (
        <div className="flex items-center gap-2">
          <MdMoreTime />
          {`Creado el ${new Date(createdAt).toLocaleDateString()}`}
        </div>
      )}
    </BasicCard>
  )
}
