import * as React from 'react'
import { styled } from '@mui/material/styles'
import { Grid, Paper } from '@mui/material'

import './ListItem.scss'

export interface IListItemProps {
  id: string
  email: string
  first_name: string
  last_name: string
  avatar: string
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}))

export default class ListItem extends React.Component<IListItemProps> {
  public static defaultProps = {
    first_name: '-',
    last_name: '-',
  }

  getName(): string {
    return `${this.props.first_name} ${this.props.last_name}`
  }

  public render(): JSX.Element {
    return (
      <Grid item className="list-item" xs={4}>
        <Item>
          <div className="list-item__avatar">
            <img src={this.props.avatar} alt="avatar" />
          </div>
          <div className="list-item__content">
            <div className="content__header">{this.getName()}</div>
            <div className="content__sub-header">{this.props.email}</div>
          </div>
        </Item>
      </Grid>
    )
  }
}
