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

    const handleNameChange = (event) => setNewName(event.target.value);
    const handlePhoneChange = (event) => setNewPhone(event.target.value);
    const handlePersonFilter = (event) => setPersonFilter(event.target.value);

    useEffect(() => {
        numberService
            .getAll()
            .then(personsData => {
                setPersons(personsData);
            })
    }, []);

    const checkIfNameIsNotPresent = (checkingPerson) => {

        return (persons.find((person) => person.name.toUpperCase() === checkingPerson.name.toUpperCase()) ===  undefined)
    }

    const checkIfPhoneIsNotPresent = (checkingPerson) => {

        return (persons.find((person) => checkingPerson.phone === person.phone) === undefined)
    }

    const showPersons = personFilter ?
        persons.filter(person => person.name.toUpperCase().search(personFilter.toUpperCase()) !== -1)
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
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson));
                    setSuccessfulAddMessage(
                        'Number successfully added.'
                    )
                    setTimeout(() => {
                        setSuccessfulAddMessage(null);
                    }, 3000)
                });
        } else {

            const confirm = window.confirm(`${newPerson.name} is already added on the phone book, replace the old number with the new one?`);

            if (confirm) {

                const existingPerson = persons.find(person => newPerson.name === person.name
                    || person.phone === newPerson.phone);
                const changedPerson = {...existingPerson, name: newPerson.name, phone: newPerson.phone};

                numberService
                    .update(changedPerson, existingPerson.id)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson));
                        setSuccessfulEditMessage(
                            `Number of ${returnedPerson.name} successfully updated.`
                        )
                        setTimeout(() => {
                            setSuccessfulEditMessage(null)
                        }, 3000);
                    })
                    .catch(e => {

                        alert(`Error, number was already deleted.`);
                        setPersons(persons.filter(person => person.id !== changedPerson.id));
                    })
            } else {

                setNewName('');
                setNewPhone('');
            }
        }
    };

    const deletePerson = (id) => {

        numberService
            .deletedItem(id).then(r => {
            if (r.status === 200) {
                setPersons(persons.filter(person => person.id !== id));
                setSuccessfulDeleteMessage(`Person successfully deleted.`)

                setTimeout(() => {
                    setSuccessfulDeleteMessage(null);
                }, 3000);
            }
        })
            .catch(e => {

                alert(`Error, number was already deleted.`);
                setPersons(persons.filter(person => person.id !== id));
            });
    };

    return (
        <div>
            <Filter filterChange={handlePersonFilter} value={personFilter} />
            <Header title='Add a new: ' />
            <Notification message={successfulAddMessage} />
            <Notification message={successfulEditMessage} />
            <Form
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newPhone={newPhone}
                handlePhoneChange={handlePhoneChange}
            />
            <Header title='Numbers: ' />
            <Notification message={successfulDeleteMessage}/>
            <Phones persons={showPersons} deleteHandler={deletePerson} />
        </div>
    );
};

export default Phonebook;
