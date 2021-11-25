import * as React from 'react'

import ListItem, { IListItemProps } from '../../components/ListItem/ListItem'
import { Grid } from '@mui/material'
import fetchList from './ListFetcher'

interface IMyListStates {
  items: IListItemProps[]
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
      .then((items: IListItemProps[]) =>
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
          {this.state?.items?.map((item: IListItemProps) => (
            <ListItem key={item.id} {...item} />
          ))}
        </Grid>
      </>
    )
  }
}
