import React, { useEffect, useState } from 'react';
import PeopleListComponent from './PeopleListComponent/PeopleListComponent';
import RegisterPersonComponent from './RegisterPersonComponent/RegisterPersonComponent';
import { openModal, closeModal, subscribeClose, unsubscribeClose } from 'app/stores/modalStore/ModalStore';

function PeopleComponent(): JSX.Element {
    const [isFormVisible, setFormVisibility] = useState<boolean>(false);

    useEffect(() => {
        const closeCallback = () => setFormVisibility(false);
        subscribeClose(closeCallback);
        return () => unsubscribeClose(closeCallback);
    }, []);

    useEffect(() => {
        isFormVisible ? openModal('person-form') : closeModal('person-form');
    }, [isFormVisible]);

    return (
        <div className="people-component">
            <PeopleListComponent></PeopleListComponent>
            <RegisterPersonComponent register={() => setFormVisibility(true)}></RegisterPersonComponent>
        </div>
    );
}

export default PeopleComponent;
