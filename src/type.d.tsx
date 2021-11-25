export interface IUser {
  id?: string
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export type UserState = {
  users: IUser[]
}

export type UserAction = {
  type: string
  user: IUser
}

export type DispatchType = (args: UserAction) => UserAction
