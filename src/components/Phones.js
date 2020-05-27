import React from 'react';
import Number from './Number';

const Phones = ({ persons, deleteHandler }) => (
  // eslint-disable-next-line react/jsx-filename-extension,max-len
  persons.map((person, i) => <Number key={i} name={person.name} number={person.phone} deleteHandler={() => deleteHandler(person.id)} />)
);

export default Phones;
