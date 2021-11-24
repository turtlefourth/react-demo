import * as React from 'react'
import ListItem, { IListItemProps } from '../components/ListItem'

interface IMyListStates {
  items: IListItemProps[]
  loading: boolean
  error: boolean
}

export default class MyList extends React.Component<unknown, IMyListStates> {
  constructor() {
    super({})
  }

  componentDidMount(): void {
    fetch('https://reqres.in/api/users?page=1')
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          items: response.data,
          loading: false,
        })
      )
      .catch((error: any) => {
        this.setState({
          loading: false,
          error: true,
        })
        console.log(error)
      })
  }
  public render(): JSX.Element {
    return (
      <>
        <h3>This is a list of users</h3>
        {this.state?.items?.map((item) => (
          <ListItem key={item.id} {...item} />
        ))}
      </>
    )
  }
}
