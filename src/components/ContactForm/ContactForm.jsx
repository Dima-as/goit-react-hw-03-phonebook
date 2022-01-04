import React, { Component } from "react";
import s from "./ContactForm.module.scss";
import PropTypes from "prop-types";
import shortid from "shortid";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };
  nameInputId = shortid.generate();
  numberInputId = shortid.generate();

  reset = () => {
    this.setState({ name: "", number: "" });
  };

  hendleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  hendleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
  };

  render() {
    const { number, name } = this.state;
    return (
      <form className={s.list} onSubmit={this.hendleSubmit}>
        <label htmlFor={this.nameInputId} className={s.item}>
          <input
            id={this.nameInputId}
            onChange={this.hendleChange}
            value={name}
            className={s.input}
            placeholder="Rosie Simpson"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor={this.numberInputId} className={s.item}>
          <input
            id={this.numberInputId}
            onChange={this.hendleChange}
            value={number}
            className={s.input}
            placeholder="459-12-56"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit" className={s.btn}>
          Add contact
        </button>
      </form>
    );
  }
}
ContactForm.propTypes = {
  state: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })
  ),
  onSubmit: PropTypes.func.isRequired,
};
export default ContactForm;
