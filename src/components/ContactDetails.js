import React from 'react';

export default class ContactDetails extends React.Component {
  render() {
    const details = (
      <div>
        <p>Name: { this.props.contact.name }</p>
        <p>Phone: { this.props.contact.phone }</p>
        <p><button onClick={this.props.onRemove}>Remove</button></p>
      </div>
    );

    const blank = (
      <p>Nothing is selected</p>
    );

    return (
      <div>
        <h2>Details</h2>
        { this.props.isSelected ? details : blank }
      </div>
    )

  }
}

ContactDetails.defaultProps = {
  contact: {
    name: '',
    phone: 'asd'
  }
}
