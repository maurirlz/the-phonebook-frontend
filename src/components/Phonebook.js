import React, { useState, useEffect } from 'react';
import Header from './Header';
import Form from './Form';
import Phones from './Phones';
import Filter from './Filter';
import numberService from '../services/numbers';
import Notification from './Notification';

const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [personFilter, setPersonFilter] = useState('');
  const [successfulDeleteMessage, setSuccessfulDeleteMessage] = useState(null);
  const [successfulAddMessage, setSuccessfulAddMessage] = useState(null);
  const [successfulEditMessage, setSuccessfulEditMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handlePhoneChange = (event) => setNewPhone(event.target.value);
  const handlePersonFilter = (event) => setPersonFilter(event.target.value);

  useEffect(() => {
    numberService
      .getAll()
      .then((personsData) => {
        setPersons(personsData);
      });
  }, []);

  // eslint-disable-next-line max-len
  const checkIfNameIsNotPresent = (checkingPerson) => (persons.find((person) => person.name.toUpperCase() === checkingPerson.name.toUpperCase()) === undefined);

  // eslint-disable-next-line max-len
  const checkIfPhoneIsNotPresent = (checkingPerson) => (persons.find((person) => checkingPerson.phone === person.phone) === undefined);

  const showPersons = personFilter
  // eslint-disable-next-line max-len
    ? persons.filter((person) => person.name.toUpperCase().search(personFilter.toUpperCase()) !== -1)
    : persons;

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      phone: newPhone,
    };

    if (checkIfNameIsNotPresent(newPerson) && checkIfPhoneIsNotPresent(newPerson)) {
      numberService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setSuccessfulAddMessage(
            'Number successfully added.',
          );
          setTimeout(() => {
            setSuccessfulAddMessage(null);
          }, 3000);
        })
      // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          setErrorMessage('VALIDATION ERROR, Ensure that length of name > 3, phone length > 7 and name is unique.');
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    } else {
      // eslint-disable-next-line no-undef
      const confirm = window.confirm(`${newPerson.name} is already added on the phone book, replace the old number with the new one?`);

      if (confirm) {
        const existingPerson = persons.find((person) => newPerson.name === person.name
                    || person.phone === newPerson.phone);
        // eslint-disable-next-line max-len
        const changedPerson = { ...existingPerson, name: newPerson.name, phone: newPerson.phone };

        numberService
          .update(changedPerson, existingPerson.id)
          .then((returnedPerson) => {
            // eslint-disable-next-line max-len
            setPersons(persons.map((person) => (person.id !== returnedPerson.id ? person : returnedPerson)));
            setSuccessfulEditMessage(
              `Number of ${returnedPerson.name} successfully updated.`,
            );
            setTimeout(() => {
              setSuccessfulEditMessage(null);
            }, 3000);
          })
        // eslint-disable-next-line no-unused-vars
          .catch((e) => {
            // eslint-disable-next-line no-undef
            alert('Error, number was already deleted.');
            setPersons(persons.filter((person) => person.id !== changedPerson.id));
          });
      } else {
        setNewName('');
        setNewPhone('');
      }
    }
  };

  const deletePerson = (id) => {
    numberService
      .deletedItem(id).then((r) => {
        if (r.status === 204) {
          setPersons(persons.filter((person) => person.id !== id));
          setSuccessfulDeleteMessage('Person successfully deleted.');

          setTimeout(() => {
            setSuccessfulDeleteMessage(null);
          }, 3000);
        }
      })
    // eslint-disable-next-line no-unused-vars
      .catch((e) => {
        // eslint-disable-next-line no-undef
        setErrorMessage('Person was already deleted from the phone-book.');
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);

        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  return (
    <div>
      <Filter filterChange={handlePersonFilter} value={personFilter} />
      <Notification message={errorMessage} />
      <Header title="Add a new: " />
      <Notification message={successfulAddMessage} />
      <Notification message={successfulEditMessage} />
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <Header title="Numbers: " />
      <Notification message={successfulDeleteMessage} />
      <Phones persons={showPersons} deleteHandler={deletePerson} />
    </div>
  );
};

export default Phonebook;
