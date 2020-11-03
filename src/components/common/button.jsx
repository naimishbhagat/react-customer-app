import React from 'react';

const Button = (label, disabled) => {
    return (
        <button disabled={disabled} className="btn btn-primary">
            {label}
        </button>
    );
};

export default Button;