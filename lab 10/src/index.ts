import { FormData, AllowedDomain } from './types'
import { validateForm } from './validator'

function logScenario(
  name: string,
  data: FormData,
  domains: AllowedDomain[],
): void {
  const errors = validateForm(data, domains)
  console.log(`${name} errors:`, errors)
}

// Сценарій A з помилками
const scenarioAData: FormData = {
  name: 'Anna',
  age: 15, // замалий вік
  email: 'anna@gmail.com', // недозволений домен
  consent: true,
}
const scenarioADomains: AllowedDomain[] = ['example.edu.ua']
logScenario('Scenario A', scenarioAData, scenarioADomains)

// Сценарій B без помилок
const scenarioBData: FormData = {
  name: 'Anna',
  age: 20,
  email: 'anna@example.edu.ua',
  consent: true,
}
const scenarioBDomains: AllowedDomain[] = ['example.edu.ua']
logScenario('Scenario B', scenarioBData, scenarioBDomains)

// Додатковий приклад з кількома помилками
const exampleData: FormData = {
  name: 'anna', // маленька літера
  age: 15, // замалий вік
  email: 'student@unknown.com', // недозволений домен
  consent: false, // немає згоди
}
const exampleDomains: AllowedDomain[] = ['softserve.edu', 'example.edu.ua']

const exampleErrors = validateForm(exampleData, exampleDomains)
console.log('Example errors:', exampleErrors)
