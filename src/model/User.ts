import { validEmailPattern } from 'src/components/UserEmail/UserEmail'
import { Role } from './Role'

export class User {
  readonly createdAt = new Date(Date.now())
  public id?: number
  public name?: string
  readonly email: string
  readonly role: Role
  constructor(email: string, role: string) {
    this.email = this.getValidEmail(email)
    this.role = this.getValidRole(role)
  }

  private getValidEmail(email: string): string {
    return getValidEmail(email)
  }

  private getValidRole(role: string): Role {
    if (Role.CUIDADOR !== role && Role.TRATANTE !== role) {
      throw new Error('Role is invalid')
    }

    return Role.CUIDADOR === role ? Role.CUIDADOR : Role.TRATANTE
  }
}

export const getValidEmail = (email: string): string => {
  if (!email) {
    throw new Error('Email is empty')
  }

  if (!validEmailPattern.test(email)) {
    throw new Error('Email is invalid')
  }

  const emailParts = email.toLowerCase().split('@')
  const idEmail = emailParts[0].replace(/\./g, '')
  const emailDomain = emailParts[1]

  return `${idEmail}@${emailDomain}`
}
