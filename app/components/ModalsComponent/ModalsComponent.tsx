import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import PersonFormComponent from '../PeopleComponent/PersonFormComponent/PersonFormComponent';
import {
    ModalTypes,
    subscribeOpen,
    unsubscribeOpen,
    subscribeClose,
    unsubscribeClose,
    TakePropsFromType,
} from 'app/stores/modalStore/ModalStore';

type ComponentMaps = Map<ModalTypes, (props?: TakePropsFromType<ModalTypes>) => JSX.Element>;

function ModalsComponent(): JSX.Element {
    const componentMaps: ComponentMaps = new Map([
        ['person-form', (props) => <PersonFormComponent person={props?.person}></PersonFormComponent>],
    ]);
    const [hasComponent, setIfHasComponent] = useState<boolean>(false);
    const [currentComponent, setComponent] = useState<ModalTypes>('');
    const [currentProps, setProps] = useState<TakePropsFromType<ModalTypes>>();
    const [classes, setClasses] = useState<string>('');

    useEffect(() => {
        const openCallback = <T extends ModalTypes>(currentModal: T, props?: TakePropsFromType<T>) =>
            updateComponent(currentModal, props);
        const closeCallback = () => updateComponent('');

        subscribeOpen(openCallback);
        subscribeClose(closeCallback);
        return () => {
            unsubscribeOpen(openCallback);
            unsubscribeClose(closeCallback);
        };
    }, []);

    function updateComponent<T extends ModalTypes>(modal: T, props?: TakePropsFromType<T>): void {
        const extraClasses = modal === '' ? 'modals-component--closed' : '';
        setComponent(modal);
        setProps(props);
        setClasses(`modals-component ${extraClasses}`);
        setIfHasComponent(!!componentMaps.get(modal));
    }

    function renderModal(): JSX.Element {
        const getComponent = componentMaps.get(currentComponent);
        if (!getComponent) {
            return <div className="modals-component-overlay"></div>;
        }
        return <div className="modals-component-overlay">{getComponent(currentProps)}</div>;
    }

    return (
        <CSSTransition in={hasComponent} timeout={{ enter: 400, exit: 400 }} classNames="modal-animation">
            <div className={classes}>{renderModal()}</div>
        </CSSTransition>
    );
}

export default ModalsComponent;
