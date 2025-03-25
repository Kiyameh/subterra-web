interface Document {
  _id: string
  master_id?: string
  [key: string]: unknown
}
//TODO: ELIMINAR SI NO NECESRIO

export function mergeDocumentArrays(
  masterArray: Document[],
  branchedArray: Document[]
) {
  const mergedCaves = []
  const branchedMap = new Map()

  // Crear mapa con los documentos de la rama:
  for (const doc of branchedArray) {
    // Si el documento tiene un master_id, se añade al mapa
    if (doc.hasOwnProperty('master_id')) {
      branchedMap.set(doc.master_id?.toString(), doc)
      // Si no tiene master_id, se añade al array de documentos (es un documento independiente)
    } else {
      mergedCaves.push(doc)
    }
  }

  // Recorrer el array de documentos maestros y...
  for (const doc of masterArray) {
    const branchDoc = branchedMap.get(doc._id.toString())
    // Si tienen rama, mergear datos y añadir al array de documentos
    if (branchDoc) {
      const merged = mergeDocuments(doc, branchDoc)
      mergedCaves.push(merged)
      // Si no tienen rama, añadir al array de documentos
    } else {
      mergedCaves.push(doc)
    }
  }

  return mergedCaves
}

function mergeDocuments(masterDoc: Document, branchDoc: Document) {
  const mergedDoc = {...masterDoc, ...branchDoc}
  return mergedDoc
}
