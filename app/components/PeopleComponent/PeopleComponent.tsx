import React, { useState } from 'react';
import PeopleListComponent from './PeopleListComponent/PeopleListComponent';
import RegisterPersonComponent from './RegisterPersonComponent/RegisterPersonComponent';
import PersonFormComponent from './PersonFormComponent/PersonFormComponent';

function PeopleComponent(): JSX.Element {
    const [isFormVisible, setFormVisibility] = useState<boolean>(false);

    function renderFormConditionally(): JSX.Element | undefined {
        if (!isFormVisible) {
            return;
        }
        return <PersonFormComponent></PersonFormComponent>;
    }

    return (
        <div className="people-component">
            <PeopleListComponent></PeopleListComponent>
            <RegisterPersonComponent
                isRegistering={isFormVisible}
                register={() => setFormVisibility(true)}
                stopRegistering={() => setFormVisibility(false)}
            ></RegisterPersonComponent>
            {renderFormConditionally()}
        </div>
    );
}

export default PeopleComponent;
