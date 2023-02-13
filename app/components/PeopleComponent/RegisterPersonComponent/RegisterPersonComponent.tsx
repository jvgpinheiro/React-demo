import React, { MouseEvent } from 'react';

type ComponentProps = {
    register: (event: MouseEvent<HTMLButtonElement>) => void;
};

function RegisterPersonComponent({ register }: ComponentProps): JSX.Element {
    function onButtonClick(event: MouseEvent<HTMLButtonElement>): void {
        register(event);
    }

    return (
        <div className="register-person-component">
            <button onClick={onButtonClick} className="register-person-component-button">
                Register Person
            </button>
        </div>
    );
}

export default RegisterPersonComponent;
