import React from 'react';

const FormInput = ({ value, changeHandler, type }) => {

    return (
        <input value={value} type= {type} onChange={changeHandler} />
    )
}

export default FormInput;