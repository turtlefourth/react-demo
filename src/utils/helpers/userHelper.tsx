import { IUser } from '../../type.d'

export default class UserHelper {
  static getId(): string {
    return Math.floor(new Date().getTime() / 1000).toString()
  }

  static getEmail(): string {
    return `test${this.getId()}@test.com`
  }

  static getAvatar(firstName: string, lastName: string): string {
    return `https://ui-avatars.com/api/?size=128&name=${firstName}+${lastName}`
  }

  static generateUser(): IUser {
    return {
      id: this.getId(),
      email: this.getEmail(),
      first_name: 'First',
      last_name: 'Last',
      avatar: this.getAvatar('First', 'Last'),
    }
  }
}
