import React, { Component } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import shortid from "shortid";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };
  componentDidMount() {
    const contact = localStorage.getItem("contacts");
    const parsedContact = JSON.parse(contact);
    if (parsedContact) {
      this.setState({ contacts: parsedContact });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }
  formSubmitData = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    if (contacts.some((contact) => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };
  onFilterInputValue = (e) => {
    this.setState({ filter: e.target.value });
  };

  visibleContacts = () => {
    const { filter, contacts } = this.state;
    const normFilter = filter.toLocaleLowerCase();
    return contacts.filter((cotact) =>
      cotact.name.toLocaleLowerCase().includes(normFilter)
    );
  };
  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const { filter } = this.state;
    const contacts = this.visibleContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitData} />
        <h2>Contacts</h2>
        <Filter value={filter} onFilterInputValue={this.onFilterInputValue} />
        <ContactList contacts={contacts} deleteContact={this.deleteContact} />
      </div>
    );
  }
}

export default App;
