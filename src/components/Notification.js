import React from 'react';

// eslint-disable-next-line react/prop-types
const Notification = ({ message }) => {

    return message === null ? null
        : (
          <div className="notification">
              {message}
            </div>
        );
};

export default Notification;