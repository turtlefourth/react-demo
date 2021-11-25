import * as actionTypes from './actionTypes'
import { IUser, UserAction, DispatchType } from '../type.d'

export type actionDispatchType = (dispatch: DispatchType) => void

export function addUser(user: IUser): actionDispatchType {
  const action: UserAction = {
    type: actionTypes.ADD_USER,
    user,
  }

  return simulateHttpRequest(action)
}

export function updateUser(user: IUser): actionDispatchType {
  const action: UserAction = {
    type: actionTypes.UPDATE_USER,
    user,
  }
  return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: UserAction): actionDispatchType {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action)
    }, 500)
  }
}
