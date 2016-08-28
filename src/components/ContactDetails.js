import React from 'react';

export default class ContactDetails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      name: '',
      phone: ''
    };

    this.onToggle = this.onToggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onToggle() {
    if (this.state.isEdit) {
      this.props.onUpdate(this.state.name, this.state.phone);
    } else {
      this.setState({
        name: this.props.contact.name,
        phone: this.props.contact.phone
      });
    }

    this.setState({
      isEdit: !this.state.isEdit
    });
  }

  onChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  onKeyPress(e) {
    const ENTER_KEY = 13;
    if (e.charCode === ENTER_KEY) {
      this.onToggle();
    }
  }

  render() {
    const read = (
      <div>
        <p>Name: { this.props.contact.name }</p>
        <p>Phone: { this.props.contact.phone }</p>
      </div>
    );

    const edit = (
      <div>
      <p>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.onChange}
        />
      </p>
      <p>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={this.state.phone}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
        />
      </p>
    </div>
    );

    const details = (
      <div>
        { this.state.isEdit ? edit : read }
        <button onClick={this.onToggle}>{ this.state.isEdit ? 'OK' : 'Edit' }</button>
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
