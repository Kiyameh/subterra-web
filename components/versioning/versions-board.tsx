'use client'

import {useState, useEffect} from 'react'
import {Calendar, ExternalLink, FileText} from 'lucide-react'
import {format} from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import {Card} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Version} from './versions'
import {Feature} from './features'
import {HorizontalScrollArea} from '../ui/horizontal-scroll-area'

/**
 * @version 1
 * @description Panel de versiones de la aplicación
 * @param versions - Lista de versiones de la aplicación
 * @param features - Lista de funcionalidades de la aplicación
 */

export default function VersionsBoard({
  versions,
  features,
}: {
  versions: Version[]
  features: Feature[]
}) {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)

  // Asigna la version actual:
  useEffect(() => {
    setSelectedVersion(versions[0].version)
  }, [versions])

  // Obtener las funcionalidades de la versión seleccionada
  const getFeaturesArray = () => {
    if (selectedVersion === 'Futuro') {
      return features.filter(
        (feature) => !versions.some((v) => v.version === feature.version)
      )
    }
    return features.filter((feature) => feature.version === selectedVersion)
  }

  // Crear el objeto de la versión seleccionada
  const getVersionObject = () => {
    if (selectedVersion === 'Futuro') {
      return {
        name: 'Funcionalidades Planeadas',
        version: 'Futuro',
        resume: 'Características que vendrán en futuras versiones',
        date: new Date(),
      }
    }
    return versions.find((v) => v.version === selectedVersion) || versions[0]
  }

  const featuresArray = getFeaturesArray()
  const versionObject = getVersionObject()

  // Ordenar las versiones de forma ascendente y recopilarlas junto con la versión futura para el timeline:
  const ascendingVersions = [...versions].reverse()
  const allVersions = [
    ...ascendingVersions,
    {
      name: 'Planeado',
      version: 'Futuro',
      resume: 'Características que vendrán en futuras versiones',
    },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Timeline Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Cronología de Versiones
        </h2>
        <p className="text-muted-foreground mt-2">
          Explora la evolución de nuestra aplicación a través de sus versiones y
          funcionalidades
        </p>
      </div>

      <div className="relative mb-12">
        {/* Timeline */}
        <HorizontalScrollArea
          startAtEnd
          scrollAmount={500}
          className="h-36"
        >
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/4 left-0 w-full h-0.5 bg-border" />

            {/* Timeline Items */}
            <div className="relative flex gap-[12vw]">
              {allVersions.map((version, index) => (
                <div
                  key={version.version}
                  className="relative flex flex-col items-center"
                >
                  <button
                    onClick={() => setSelectedVersion(version.version)}
                    className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      selectedVersion === version.version
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background hover:border-primary/50'
                    }`}
                  >
                    {index === ascendingVersions.length - 1 && (
                      <Badge className="absolute -top-2 -right-2 px-1 py-0 text-[10px]">
                        Nuevo
                      </Badge>
                    )}
                    {version.version === 'Futuro' ? '🚀' : index + 1}
                  </button>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium">{version.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {version.version}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </HorizontalScrollArea>
      </div>

      {/* Selected Version Details */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold">{versionObject.name}</h3>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              {selectedVersion !== 'Futuro' && (
                <>
                  <Badge variant="outline">v{versionObject.version}</Badge>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span className="text-sm">
                      {format(new Date(versionObject.date), "d 'de' MMM, yyyy")}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          {versionObject.resume && (
            <p className="text-muted-foreground max-w-md">
              {versionObject.resume}
            </p>
          )}
        </div>

        {/* Features Grid */}
        {featuresArray.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresArray.map((feature) => (
              <Card
                key={feature.name}
                className="overflow-hidden flex flex-col"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 p-2 rounded-md bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{feature.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {feature.image_src && (
                    <div className="relative h-40 w-full mb-4 rounded-md overflow-hidden">
                      <Image
                        src={feature.image_src || '/image-placeholder.svg'}
                        alt={feature.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {(feature.docs || feature.url) && (
                    <div className="flex gap-2 mt-4">
                      {feature.docs && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link href={feature.docs}>
                            <FileText className="h-4 w-4 mr-2" />
                            Documentación
                          </Link>
                        </Button>
                      )}
                      {feature.url && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link href={feature.url}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visitar
                          </Link>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <p className="text-muted-foreground">
              No hay funcionalidades disponibles para esta versión
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
