import React from 'react';

const FormInput = ({ value, changeHandler, type }) => (
  <input value={value} type={type} onChange={changeHandler} />
);

export default FormInput;
