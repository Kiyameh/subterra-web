export interface Answer {
  ok: boolean
  code?: number
  message?: string
  error?: object
  content?: object
  redirect?: string
}
