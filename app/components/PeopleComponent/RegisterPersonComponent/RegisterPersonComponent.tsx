import React, { MouseEvent, useEffect, useState } from 'react';

type ComponentProps = {
    isRegistering: boolean;
    register?: (event: MouseEvent<HTMLButtonElement>) => void;
    stopRegistering?: (event: MouseEvent<HTMLButtonElement>) => void;
};

function RegisterPersonComponent(props: ComponentProps): JSX.Element {
    const [buttonText, setButtonText] = useState<'Register Person' | 'Stop Registering'>('Register Person');

    useEffect(() => {
        props.isRegistering ? setButtonText('Stop Registering') : setButtonText('Register Person');
    }, [props.isRegistering]);

    function onButtonClick(event: MouseEvent<HTMLButtonElement>): void {
        const register = props.register ? props.register : () => {};
        const stopRegistering = props.stopRegistering ? props.stopRegistering : () => {};
        props.isRegistering ? stopRegistering(event) : register(event);
    }

    return (
        <div className="register-person-component">
            <button onClick={onButtonClick} className="register-person-component-button">
                {buttonText}
            </button>
        </div>
    );
}

export default RegisterPersonComponent;
