import * as React from 'react'
import {
  Alert,
  Button,
  Container,
  Stack,
  FormControl,
  TextField,
  Box,
} from '@mui/material'

import fetchUser from './UserFetcher'
import { IUser } from '../../type.d'

export interface IValues {
  [key: string]: string
}

export interface IErrors {
  [key: string]: string
}

export interface IFormState {
  values: IValues
  user?: IUser
  errors: IErrors
  submitSuccess?: boolean
}

const defaultValues: IValues = {
  id: '2',
  email: 'janet.weaver@reqres.in',
}

export default class MyForm extends React.Component<unknown, IFormState> {
  constructor(props: unknown = {}) {
    super(props)

    const errors: IErrors = {}
    const values: IValues = defaultValues
    this.state = {
      errors,
      values,
    }
  }

  private handleValueChange = (key: string, value: string): void => {
    const values: IValues = this.state?.values
    Object.assign(values, { [key]: value })
    this.setState({ values, submitSuccess: undefined })
    this.validateForm()
  }

  private haveErrors(): boolean {
    if (!this.state?.errors) {
      return false
    }
    return Object.keys(this.state.errors).some(
      (key: string) => this.state.errors[key].length
    )
  }

  private getErrors(): string[] {
    return Object.keys(this.state?.errors).map(
      (key) => this.state?.errors[key] || ''
    )
  }

  private checkUser(): boolean {
    return (
      this.state?.values?.id === this.state?.user?.id?.toString() &&
      this.state?.values?.email === this.state?.user?.email
    )
  }

  private handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    this.setState({ user: undefined })

    if (this.validateForm()) {
      const submitSuccess: boolean = await this.submitForm()
      this.setState({ submitSuccess })
    } else {
      this.setState({ submitSuccess: false })
    }
  }

  private validateForm(): boolean {
    const errors: IErrors = {}
    let result = true

    if (!/^\d+$/.test(this.state?.values?.id)) {
      errors.id = 'Not a valid number'
      result = false
    }
    if (
      //eslint-disable-next-line no-useless-escape
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.state?.values?.email
      )
    ) {
      errors.email = 'Not a valid email'
      result = false
    }

    this.setState({ errors })
    return result
  }

  private async submitForm(): Promise<boolean> {
    fetchUser(this.state?.values?.id)
      .then((user: IUser) => {
        this.setState({ user })
      })
      .catch((error: Error) => {
        this.setState({ submitSuccess: false })
        console.log(error)
      })
    return true
  }

  user(): JSX.Element {
    return (
      <>
        <span>{this?.state?.user?.id}</span>-
        <span>{this?.state?.user?.email}</span>
      </>
    )
  }

  public render(): JSX.Element {
    return (
      <Container maxWidth="xs">
        <form onSubmit={this.handleSubmit} noValidate={true}>
          <Stack spacing={2}>
            <FormControl>
              <TextField
                error={!!this.state?.errors?.id}
                id="id"
                label="ID"
                value={this.state?.values?.id}
                helperText="ID should be a number."
                onChange={(e) => this.handleValueChange('id', e.target.value)}
              />
            </FormControl>
            <FormControl>
              <TextField
                error={!!this.state?.errors?.email}
                id="email"
                label="Email"
                value={this.state?.values?.email}
                helperText="Please input correct format for email."
                onChange={(e) =>
                  this.handleValueChange('email', e.target.value)
                }
              />
            </FormControl>
            <Button type="submit" variant="contained">
              Check user
            </Button>
          </Stack>
        </form>
        <Box mt={2}>
          {this.state?.submitSuccess && (
            <Alert severity="success">Successfully submitted</Alert>
          )}
          {this.state?.submitSuccess === false && !this.haveErrors() && (
            <Alert severity="error">There is an unexpected error</Alert>
          )}
          {this.state?.submitSuccess === false && this.haveErrors() && (
            <Alert severity="error">
              The form is invalid.
              {this.getErrors()?.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </Alert>
          )}
        </Box>
        {this.state?.user && (
          <Box mt={2} sx={{ textAlign: 'left' }}>
            {this.state?.submitSuccess && !this.checkUser() && (
              <Alert severity="error">
                <div>User did not match!</div>
                {this.user()}
              </Alert>
            )}
            {this.state?.submitSuccess && this.checkUser() && (
              <Alert severity="success">
                <div>User matched!</div>
                {this.user()}
              </Alert>
            )}
          </Box>
        )}
      </Container>
    )
  }
}
