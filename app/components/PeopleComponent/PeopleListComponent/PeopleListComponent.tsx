import { openModal } from 'app/stores/modalStore/ModalStore';
import React, { useState, useEffect } from 'react';
import { deletePerson, getPeopleList, subscribe, unsubscribe } from '../../../stores/peopleStore/PeopleStore';

function PeopleListComponent(): JSX.Element {
    const [list, setList] = useState(getPeopleList());

    useEffect(() => {
        const callback = () => updateList();
        subscribe(callback);
        return () => unsubscribe(callback);
    }, []);

    function updateList(): void {
        setList(getPeopleList());
    }

    function makeListColumns(): JSX.Element {
        return (
            <tr className="people-list-component-table-header-item">
                <td className="people-list-component-table-header-item-data people-list-component-table-header-item-data--delete people-list-component-table-header-item-data--no-separator">
                    <div className="people-list-component-table-header-item-data__container">
                        <span></span>
                    </div>
                </td>
                <td className="people-list-component-table-header-item-data people-list-component-table-header-item-data--edit">
                    <div className="people-list-component-table-header-item-data__container">
                        <span></span>
                    </div>
                </td>
                <td className="people-list-component-table-header-item-data people-list-component-table-header-item-data--name">
                    <div className="people-list-component-table-header-item-data__container">
                        <span>Name</span>
                    </div>
                </td>
                <td className="people-list-component-table-header-item-data people-list-component-table-header-item-data--age">
                    <div className="people-list-component-table-header-item-data__container">
                        <span>Age</span>
                    </div>
                </td>
            </tr>
        );
    }

    function makeListItems(): Array<JSX.Element> {
        return list.map((person) => (
            <tr className="people-list-component-table-body-item" key={person.id}>
                <td className="people-list-component-table-body-item-data people-list-component-table-body-item-data--delete people-list-component-table-body-item-data--no-separator">
                    <div className="people-list-component-table-body-item-data__container" onClick={() => deletePerson(person)}>
                        <span>Delete</span>
                    </div>
                </td>
                <td className="people-list-component-table-body-item-data people-list-component-table-body-item-data--edit">
                    <div
                        className="people-list-component-table-body-item-data__container"
                        onClick={() => openModal('person-form', { person })}
                    >
                        <span>Edit</span>
                    </div>
                </td>
                <td className="people-list-component-table-body-item-data people-list-component-table-body-item-data--name">
                    <div className="people-list-component-table-body-item-data__container">
                        <span>{person.name}</span>
                    </div>
                </td>
                <td className="people-list-component-table-body-item-data people-list-component-table-body-item-data--age">
                    <div className="people-list-component-table-body-item-data__container">
                        <span>{person.age}</span>
                    </div>
                </td>
            </tr>
        ));
    }

    return (
        <div className="people-list-component">
            <div className="people-list-component-title">Registered People</div>
            <table className="people-list-component-table">
                <thead className="people-list-component-table-header">{makeListColumns()}</thead>
                <tbody className="people-list-component-table-body">{makeListItems()}</tbody>
            </table>
        </div>
    );
}

export default PeopleListComponent;
