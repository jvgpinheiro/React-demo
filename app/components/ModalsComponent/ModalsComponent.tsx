import React, { useEffect, useState } from 'react';
import PersonFormComponent from '../PeopleComponent/PersonFormComponent/PersonFormComponent';
import { ModalTypes, subscribeOpen, unsubscribeOpen, subscribeClose, unsubscribeClose } from 'app/stores/modalStore/ModalStore';

function ModalsComponent(): JSX.Element {
    const componentMaps = new Map<ModalTypes, JSX.Element>([['person-form', <PersonFormComponent></PersonFormComponent>]]);
    const [currentComponent, setComponent] = useState<ModalTypes>('');
    const [classes, setClasses] = useState<string>('');

    useEffect(() => {
        const openCallback = (currentModal: ModalTypes) => updateComponent(currentModal);
        const closeCallback = () => updateComponent('');

        subscribeOpen(openCallback);
        subscribeClose(closeCallback);
        return () => {
            unsubscribeOpen(openCallback);
            unsubscribeClose(closeCallback);
        };
    }, []);

    function updateComponent(modal: ModalTypes): void {
        setComponent(modal);
        const extraClasses = modal === '' ? 'modals-component--closed' : '';
        setClasses(`modals-component ${extraClasses}`);
    }

    function renderModal(): JSX.Element | undefined {
        const componentElement = componentMaps.get(currentComponent);
        if (!componentElement) {
            return;
        }
        return <div className="modals-component-overlay">{componentElement}</div>;
    }

    return <div className={classes}>{renderModal()}</div>;
}

export default ModalsComponent;
