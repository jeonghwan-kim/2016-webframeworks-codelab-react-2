import React from 'react';

export default class ContactCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onClick() {
    this.props.onCreate({
      name: this.state.name,
      phone: this.state.phone
    });

    this.setState({
      name: '',
      phone: ''
    });
  }

  onKeyPress(e) {
    const ENTER_KEY = 13;
    if (e.charCode === ENTER_KEY) {
      this.onClick();
    }
  }

  render() {
    return (
      <div>
        <h2>Create Contact</h2>
        <p>
          <input type="text" name="name" placeholder="Name"
            value={this.state.name} onChange={this.onChange} />
        </p>
        <p>
          <input type="text" name="phone" placeholder="Phone"
            value={this.state.phone} onChange={this.onChange} onKeyPress={this.onKeyPress} />
        </p>
        <button onClick={this.onClick}>Create</button>
      </div>
    )
  }
}
