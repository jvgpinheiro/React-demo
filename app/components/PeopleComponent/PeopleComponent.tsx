import React from 'react';
import PeopleListComponent from './PeopleListComponent/PeopleListComponent';
import PersonSignupComponent from './PersonSignUpComponent/PersonSignUpComponent';

function PeopleComponent(): JSX.Element {
    return (
        <div className="people-component">
            <PeopleListComponent></PeopleListComponent>
            <PersonSignupComponent></PersonSignupComponent>
        </div>
    );
}

export default PeopleComponent;
