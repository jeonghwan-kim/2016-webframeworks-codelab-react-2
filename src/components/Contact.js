import React from 'react';

import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      selectedKey: -1,
      contactData: [
        { name: 'Abet', phone: '010-0000-0001' },
        { name: 'Betty', phone: '010-0000-0002' },
        { name: 'Charlie', phone: '010-0000-0003' },
        { name: 'David', phone: '010-0000-0004'}
      ]
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  onClick(key) {
    console.log(key);
    this.setState({
      selectedKey: key
     });
  }

  render() {
    const mapToComponents = data => {
      data.sort();
      if (this.state.keyword && this.state.keyword.length) {
        data = data.filter(contact => {
          return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1
        });
      }
      return data.map((contactInfo, i) => {
        return (
          <ContactInfo
            contact={contactInfo}
            key={i}
            onClick={() => this.onClick(i)}
          />
        );
      });
    };

    return (
      <div>
        <h1>Contacts</h1>
        <input
          type="text"
          placeholder="Search"
          value={this.state.keyword}
          onChange={this.onChange}
        />
        <div>{mapToComponents(this.state.contactData)}</div>
        <ContactDetails
          contact={this.state.contactData[this.state.selectedKey]}
          isSelected={this.state.selectedKey > -1}
        />
      </div>
    )
  }
}
