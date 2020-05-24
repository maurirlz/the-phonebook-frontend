import React from 'react';
import Header from './Header';
import FormInput from './FormInput';

const Filter = ({ filterChange, personFilter }) => {

    return (
        <div>
            <Header title="Mauri's personal Phone book:"/>
            <p>Filter names shown with: </p>
            <FormInput value={personFilter} type="text" changeHandler={filterChange}/>
        </div>
    )
}

export default Filter;