import {Instance} from '@/database/models/Instance.model'
import React from 'react'
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import LinkButton from '@/components/navigation/link-button'

import {MdOutlineTravelExplore} from 'react-icons/md'
import {RiAdminLine} from 'react-icons/ri'
import {MdGroup} from 'react-icons/md'
import {MdVisibility} from 'react-icons/md'
import {MdModeEdit} from 'react-icons/md'

import InfoBadge from '@/components/displaying/info-badge'
import OnlineIndicator from '@/components/displaying/online-indicator'

interface InstanceCardProps {
  instance: Instance
}
export default function InstanceCard({instance}: InstanceCardProps) {
  const {
    name,
    is_online,
    territory,
    owner,
    admin,
    public_visibility,
    public_edition,
    fullname,
    description,
  } = instance

  return (
    <Card className="w-80 max-w-[90%]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <OnlineIndicator isOnline={is_online} />
          <CardTitle>{fullname}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {territory && (
            <div className="flex items-center gap-2">
              <MdOutlineTravelExplore />
              {territory}
            </div>
          )}

          {admin && (
            <div className="flex items-center gap-2">
              <RiAdminLine />
              {admin?.name}
            </div>
          )}
          {owner && (
            <div className="flex items-center gap-2">
              <MdGroup />
              {owner?.name}
            </div>
          )}
          {public_visibility && (
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
                  label="Solo autorizados"
                  description="Solo usuarios autorizados"
                />
              )}
            </div>
          )}
          {public_edition && (
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
                  description="Solo usuarios autorizados"
                />
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <LinkButton
          href={`/dashboard/${name}`}
          label="Acceder"
          disabled={!instance.is_online}
        />
      </CardFooter>
    </Card>
  )
}
