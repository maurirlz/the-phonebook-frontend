import React from 'react';
import Number from './Number'

const Phones = ({ persons, deleteHandler }) => {

    return (
        persons.map((person, i) =>
            <Number key={i} name={person.name} number={person.phone} deleteHandler={() => deleteHandler(person.id)}/>
        )
    )
}

export default Phones