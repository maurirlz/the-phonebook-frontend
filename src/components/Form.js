import React from 'react';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';

const Form = ({
  addPerson, newName, handleNameChange,
  newPhone, handlePhoneChange,
}) => (
  <form onSubmit={addPerson}>
    <div>
      Name:
      {' '}
      <FormInput value={newName} changeHandler={handleNameChange} type="text" />
      <br />
      Phone:
      {' '}
      <FormInput value={newPhone} changeHandler={handlePhoneChange} type="text" />
    </div>
    <div>
      <br />
      <SubmitButton title="Add a record" />
    </div>
  </form>
);

export default Form;
