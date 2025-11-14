export type AllowedDomain = 'softserve.edu' | 'example.edu.ua'

export type ValidationResult = 'ok' | 'error'

export type FieldName = 'name' | 'age' | 'email' | 'consent'

export type FieldValue = string | number | boolean

export interface FormData {
  name: string
  age: number
  email: string
  consent: boolean
}
