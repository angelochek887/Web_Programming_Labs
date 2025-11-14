import {
  AllowedDomain,
  FieldName,
  FieldValue,
  FormData,
  ValidationResult,
} from './types'

export const DEFAULT_ALLOWED_DOMAINS: AllowedDomain[] = [
  'softserve.edu',
  'example.edu.ua',
]

export function normalizeName(name: string): string {
  const trimmed = name.trim()
  if (trimmed === '') return ''
  return trimmed
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ')
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function normalizeFormData(data: FormData): FormData {
  return {
    ...data,
    name: normalizeName(data.name),
    email: normalizeEmail(data.email),
  }
}

export function validateName(name: string): boolean {
  const value = name.trim()
  if (value.length < 2) return false

  const lettersOnly =
    /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ']+( [A-Za-zА-Яа-яЁёІіЇїЄєҐґ']+)*$/u

  if (!lettersOnly.test(value)) return false

  if (value.charAt(0) !== value.charAt(0).toUpperCase()) return false

  return true
}

export function validateAge(age: number): boolean {
  if (!Number.isFinite(age)) return false
  return age >= 16 && age <= 120
}

export function validateEmail(
  email: string,
  allowedDomains: readonly AllowedDomain[] = DEFAULT_ALLOWED_DOMAINS,
): boolean {
  const value = email.trim()

  const atIndex = value.indexOf('@')
  if (atIndex <= 0) return false

  const dotIndex = value.indexOf('.', atIndex)
  if (dotIndex <= atIndex + 1) return false

  const domain = value.slice(atIndex + 1).toLowerCase() as AllowedDomain

  if (!allowedDomains.includes(domain)) return false

  return true
}

export function validateConsent(consent: boolean): boolean {
  return consent === true
}

export function validateField(
  name: FieldName,
  value: FieldValue,
  allowedDomains: readonly AllowedDomain[] = DEFAULT_ALLOWED_DOMAINS,
): ValidationResult {
  switch (name) {
    case 'name':
      return typeof value === 'string' && validateName(value)
        ? 'ok'
        : 'error'
    case 'age':
      return typeof value === 'number' && validateAge(value)
        ? 'ok'
        : 'error'
    case 'email':
      return typeof value === 'string' &&
        validateEmail(value, allowedDomains)
        ? 'ok'
        : 'error'
    case 'consent':
      return typeof value === 'boolean' && validateConsent(value)
        ? 'ok'
        : 'error'
    default: {
      const _exhaustiveCheck: never = name
      throw new Error(`Unknown field: ${String(_exhaustiveCheck)}`)
    }
  }
}

export function validateForm(
  rawData: FormData,
  allowedDomains: readonly AllowedDomain[] = DEFAULT_ALLOWED_DOMAINS,
): string[] {
  const data = normalizeFormData(rawData)
  const errors: string[] = []

  if (!validateName(data.name)) {
    errors.push(
      'Name is invalid (min 2 letters, only letters, starts with capital)',
    )
  }

  if (!validateAge(data.age)) {
    errors.push('Age must be between 16 and 120')
  }

  if (!validateEmail(data.email, allowedDomains)) {
    const domainsList = allowedDomains.join(', ')
    errors.push(`Allowed domains: ${domainsList}`)
  }

  if (!validateConsent(data.consent)) {
    errors.push('Consent is required')
  }

  return errors
}
