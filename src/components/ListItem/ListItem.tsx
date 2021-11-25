import * as React from 'react'
import { styled } from '@mui/material/styles'
import { Button, Grid, Paper } from '@mui/material'
import { IUser } from '../../type.d'

import './ListItem.scss'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}))

interface IExtendedUser extends IUser {
  editable?: boolean
  handleEdit?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default class ListItem extends React.Component<IExtendedUser> {
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
            {this.props.editable && (
              <Button
                className="content__action"
                variant="outlined"
                onClick={this.props.handleEdit}
              >
                Edit
              </Button>
            )}
          </div>
        </Item>
      </Grid>
    )
  }
}
