export { GenericError } from './GenericError'
export { AuthenticationDeniedError } from './AutheticationDeniedError'
export { Unauthorized } from './Unauthorized'
export { FailedSymptomsRegistry } from './FailedSymptomsRegistry'

export enum ErrorCodes {
  AccessDenied = 'AccessDenied',
  Unauthorized = 'Unauthorized',
  FailedSymptomsRegistry = 'FailedSymptomsRegistry',
}
