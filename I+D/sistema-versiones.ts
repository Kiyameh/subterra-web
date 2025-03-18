/* // Definiciones de tipos
type VersionAnterior = {
  _v: number // Número de versión
  [clave: string]: unknown // Propiedades modificadas
}

type Documento = {
  _id: number
  _v: number // Versión actual
  [clave: string]: unknown // Otras propiedades dinámicas
  old_versions: VersionAnterior[] // Colección de versiones anteriores
}

// Documento de ejemplo inicial
const documento: Documento = {
  _id: 1,
  _v: 1,
  nombre: 'Producto A',
  precio: 100,
  old_versions: [], // Almacenará versiones previas
}

// Función para actualizar el documento
function update(documento: Documento, cambios: Partial<Documento>): void {
  // Crear una copia de las propiedades modificadas de la versión actual
  const versionAnterior: VersionAnterior = {_v: documento._v}
  for (const clave in cambios) {
    if (documento[clave] !== undefined && documento[clave] !== cambios[clave]) {
      versionAnterior[clave] = documento[clave]
    }
  }

  // Guardar la copia en old_versions si hay propiedades modificadas
  if (Object.keys(versionAnterior).length > 1) {
    // Más de solo _v
    documento.old_versions.push(versionAnterior)
  }

  // Aplicar los cambios y actualizar el número de versión
  Object.assign(documento, cambios)
  documento._v++
}

// Función para leer una versión específica del documento
function read(documento: Documento, version: number): Documento {
  if (version >= documento._v) {
    console.log('La versión solicitada no existe o es la versión actual.')
    return documento // Devolver la versión actual
  }

  // Crear una copia del documento actual
  const documentoHistorico: Documento = {...documento}
  delete documentoHistorico.old_versions

  // Aplicar versiones previas de manera decreciente
  for (let i = documento.old_versions.length - 1; i >= 0; i--) {
    const versionAnterior = documento.old_versions[i]
    if (versionAnterior._v <= version) {
      break // Llegamos a la versión solicitada
    }
    // Revertir propiedades al estado anterior
    for (const clave in versionAnterior) {
      if (clave !== '_v') {
        documentoHistorico[clave] = versionAnterior[clave]
      }
    }
  }

  // Ajustar el número de versión
  documentoHistorico._v = version
  return documentoHistorico
}

// Ejemplo de uso
console.log('Documento original:', documento)

// Realizar una actualización
update(documento, {precio: 120})
console.log('Después de la primera actualización:', documento)

update(documento, {nombre: 'Producto B', categoria: 'Electrónica'})
console.log('Después de la segunda actualización:', documento)

// Leer una versión específica
const version1 = read(documento, 1)
console.log('Versión 1 del documento:', version1)

const version2 = read(documento, 2)
console.log('Versión 2 del documento:', version2)
 */
