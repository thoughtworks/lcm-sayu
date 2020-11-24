export class User {
  readonly createdAt = new Date(Date.now())
  public id?: number
  constructor(public email: string, public role: string) {}
}
