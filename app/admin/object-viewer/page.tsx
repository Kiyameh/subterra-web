'use client'
import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import React from 'react'
import {Button} from '@/components/Atoms/button'

const JsonViewer = ({data}: {data: object}) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(JSON.stringify(data, null, 2))
      .then(() => {
        alert('Texto copiado al portapapeles')
      })
      .catch((err) => {
        console.error('Error al copiar el texto: ', err)
      })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 bg-muted p-4 rounded-lg">
        <p>
          {Object.keys(data).length === 0
            ? 'No hay datos'
            : 'Datos de objeto JSON'}
        </p>
        <p>
          {Object.keys(data).length}
          {Object.keys(data).length === 1 ? 'elemento' : 'elementos'}
        </p>

        <Button onClick={handleCopy}>Copiar JSON</Button>
      </div>
      <pre style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  )
}

export default function ObjectViewerPage() {
  const exampleUser = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      country: 'USA',
    },
    phone: '555-1234',
  }

  return (
    <CardWithHeader
      cardSubHeader="Object Viewer"
      defaultWidth="xl"
    >
      <JsonViewer data={exampleUser} />
    </CardWithHeader>
  )
}
