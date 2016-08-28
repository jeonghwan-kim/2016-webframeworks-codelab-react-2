import React from 'react';
import update from 'react-addons-update';

import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';

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
    this.onCreate = this.onCreate.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  componentWillMount() {
    let contactData = localStorage.contactData;

    if (contactData) {
      this.setState({
        contactData: JSON.parse(contactData)
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const contactDataString =  JSON.stringify(this.state.contactData);
    if (JSON.stringify(prevState.contactData) !== contactDataString) {
      localStorage.contactData = contactDataString;
    }
  }

  onChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  onClick(key) {
    this.setState({
      selectedKey: key
    });
  }

  onCreate(contact) {
    this.setState({
      contactData: update(this.state.contactData, {
        $push: [contact]
      })
    });
  }

  onUpdate(name, phone) {
    this.setState({
      contactData: update(this.state.contactData, {
        [this.state.selectedKey]: {
          name: { $set: name },
          phone: { $set: phone}
        }
      })
    });
  }

  onRemove() {
    console.log('onRemove')
    this.setState({
      contactData: update(this.state.contactData, {
        $splice: [[this.state.selectedKey, 1]]
      }),
      selectedKey: -1
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
          onRemove={this.onRemove}
          onUpdate={this.onUpdate}
        />
        <ContactCreate
          onCreate={this.onCreate}/>
      </div>
    )
  }
}
