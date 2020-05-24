import React from 'react';

const Number = ({ name, number, deleteHandler}) => {

    return (
        <>
            <p>{name} {number}</p>
            <button onClick={deleteHandler}>delete number</button>
        </>
    )
}

export default Number;