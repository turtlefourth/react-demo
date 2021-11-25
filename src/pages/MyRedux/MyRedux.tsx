import * as React from 'react'
import { Dispatch, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { IUser, UserState } from '../../type.d'

import {
  actionDispatchType,
  addUser,
  updateUser,
} from '../../store/actionCreators'
import UserHelper from '../../utils/helpers/userHelper'

import ListItem from '../../components/ListItem/ListItem'
import {
  Container,
  Stack,
  FormControl,
  TextField,
  Grid,
  Button,
} from '@mui/material'

function MyRedux(): JSX.Element {
  const users: readonly IUser[] = useSelector(
    (state: UserState) => state.users,
    shallowEqual
  )

  const [user, setUser] = React.useState<IUser>(UserHelper.generateUser())
  const [isEditing, setIsEditing] = React.useState<boolean>(false)

  const dispatch: Dispatch<actionDispatchType> = useDispatch()
  const addNewUser = useCallback(
    (user: IUser) => dispatch(addUser(user)),
    [dispatch]
  )
  const updateSelectedUser = useCallback(
    (user: IUser) => dispatch(updateUser(user)),
    [dispatch]
  )

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    if (isEditing) {
      return handleUpdateUser()
    }
    return handleAddUser()
  }

  const handleSetEditStatus = (selectedUser: IUser): void => {
    setUser(selectedUser)
    setIsEditing(true)
  }

  const handleAddUser = (): void => {
    addNewUser(user)
    setUser(UserHelper.generateUser())
  }

  const handleUpdateUser = (): void => {
    updateSelectedUser(user)
    setIsEditing(false)
    setUser(UserHelper.generateUser())
  }

  const handleValueChange = (key: string, value: string): void => {
    const newUser: IUser = { ...user }
    Object.assign(newUser, { [key]: value })
    Object.assign(newUser, {
      avatar: UserHelper.getAvatar(newUser.first_name, newUser.last_name),
    })
    if (!isEditing) {
      Object.assign(newUser, {
        id: UserHelper.getId(),
        email: UserHelper.getEmail(),
      })
    }
    setUser(newUser)
  }

  return (
    <Container>
      <Container maxWidth="xs">
        <h2>Add a new user</h2>
        <form onSubmit={handleSubmit} noValidate={true}>
          <Stack spacing={2}>
            <FormControl>
              <TextField
                id="firstName"
                label="First name"
                value={user.first_name}
                onChange={(e) =>
                  handleValueChange('first_name', e.target.value)
                }
              />
            </FormControl>
            <FormControl>
              <TextField
                id="lastName"
                label="Last name"
                value={user.last_name}
                onChange={(e) => handleValueChange('last_name', e.target.value)}
              />
            </FormControl>
            <Button type="submit" variant="contained">
              {!isEditing ? 'Add user' : 'Edit user'}
            </Button>
          </Stack>
        </form>
      </Container>
      <Grid container className="user-list" spacing={2} mt={4}>
        {users.map((userItem: IUser) => (
          <ListItem
            key={userItem.id}
            {...userItem}
            editable={!isEditing || user.id !== userItem.id}
            handleEdit={() => handleSetEditStatus(userItem)}
          />
        ))}
      </Grid>
    </Container>
  )
}

export default MyRedux
