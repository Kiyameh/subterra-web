/**
 * @enum con los datos disponibles en el campo subject del formulario de contacto.
 */
export const contactSubjects = [
  'Incidencia técnica',
  'Solicitud de información',
  'Sugerencia',
  'Feedback plataforma',
  'Otro',
] as const

/**
 * @type Tipo del campo "subject" del formulario de contacto.
 */
export type ContactSubjects = (typeof contactSubjects)[number]
