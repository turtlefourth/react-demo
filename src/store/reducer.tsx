/* eslint-disable no-case-declarations */
import { IUser, UserAction, UserState } from '../type.d'
import * as actionTypes from './actionTypes'

const initialState: UserState = {
  users: [],
}

const reducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      const newUser: IUser = {
        id: action.user?.id,
        email: action.user?.email,
        first_name: action.user?.first_name,
        last_name: action.user?.last_name,
        avatar: action.user?.avatar,
      }
      return {
        ...state,
        users: state.users.concat(newUser),
      }
    case actionTypes.UPDATE_USER:
      const updatedUsers: IUser[] = state.users.map((user) =>
        user.id === action.user?.id ? action.user : user
      )
      return {
        ...state,
        users: updatedUsers,
      }
  }
  return state
}

export default reducer
