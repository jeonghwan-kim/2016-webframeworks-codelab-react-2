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

  render() {
    return (
      <div>
        <h2>Create Contact</h2>
        <p>
          <input type="text" name="name" placeholder="name"
            value={this.state.name} onChange={this.onChange} />
        </p>
        <p>
          <input type="text" name="phone" placeholder="phone"
            value={this.state.phone} onChange={this.onChange} />
        </p>
        <button onClick={this.onClick}>Create</button>
      </div>
    )
  }
}
