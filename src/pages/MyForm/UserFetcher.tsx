import { IUser } from '../../type.d'

export default async function fetchUser(id: string | number): Promise<IUser> {
  const response = await window.fetch(`https://reqres.in/api/users/${id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })

  type JSONResponse = {
    data?: IUser
    errors?: Array<{ message: string }>
  }
  const { data, errors }: JSONResponse = await response.json()
  if (response.ok) {
    if (data) {
      return Object.assign(data)
    } else {
      return Promise.reject(new Error(`Cannot get user with id: ${id}`))
    }
  } else {
    const error = new Error(
      errors?.map((e) => e.message).join('\n') ?? 'unknown'
    )
    return Promise.reject(error)
  }
}
