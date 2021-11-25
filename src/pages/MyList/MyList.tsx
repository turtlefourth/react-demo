import * as React from 'react'

import ListItem from '../../components/ListItem/ListItem'
import { IUser } from '../../type.d'
import { Grid } from '@mui/material'
import fetchList from './ListFetcher'

interface IMyListStates {
  items: IUser[]
  loading: boolean
  error: boolean
}

export default class MyList extends React.Component<unknown, IMyListStates> {
  constructor(props = {}) {
    super(props)
  }

  state = {
    items: [],
    loading: true,
    error: false,
  }

  componentDidMount(): void {
    fetchList(1)
      .then((items: IUser[]) =>
        this.setState({
          items,
          loading: false,
        })
      )
      .catch((error: Error) => {
        this.setState({
          loading: false,
          error: true,
        })
        console.log(error)
      })
  }

  public render(): JSX.Element {
    if (this.state?.loading) {
      return <span>Loading...</span>
    }

    if (this.state?.error) {
      return <span>Error to load data</span>
    }

    return (
      <>
        <h3>This is a list of users</h3>
        <Grid container className="user-list" spacing={2}>
          {this.state?.items?.map((item: IUser) => (
            <ListItem key={item.id} {...item} />
          ))}
        </Grid>
      </>
    )
  }
}
