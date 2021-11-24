import * as React from 'react'

export interface IListItemProps {
  id: string
  email: string
  first_name: string
  last_name: string
  avatar: string
}

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
      <div>
        <div className="list-item__avatar">
          <img src={this.props.avatar} alt="avatar" />
        </div>
        <div className="list-item__content">
          <span className="content__header">{this.getName()}</span>
          <span className="content__sub-header">{this.props.email}</span>
        </div>
      </div>
    )
  }
}
