import React from 'react'
import {auth} from '@/app/(authentication)/auth'
import BackButton from '@/components/navigation/back-button'
import {FaUser} from 'react-icons/fa'

import {Card, CardHeader, CardFooter, CardContent} from '@/components/ui/card'

export default async function ProfilePage() {
  const session = await auth()
  // TODO: Implement profile page

  return (
    <Card>
      <CardHeader className="flex flex-row gap-2">
        <FaUser className="w-6 h-6" />
        Perfil de usuario
      </CardHeader>
      <CardContent>
        <h2>Sesión:</h2>
        <div>{JSON.stringify(session)}</div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex flex-col gap-3">
          <BackButton />
        </div>
      </CardFooter>
    </Card>
  )
}
