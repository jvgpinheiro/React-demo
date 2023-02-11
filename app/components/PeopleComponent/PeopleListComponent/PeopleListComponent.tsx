import React, { useState, useEffect } from 'react';
import { getPeopleList, subscribe, unsubscribe } from '../../../stores/peopleStore/PeopleStore';

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

    function makeListItems(): Array<JSX.Element> {
        return list.map((person) => (
            <li key={person.id}>
                {person.name}: {person.age} years old
            </li>
        ));
    }

    return (
        <div className="people-list-component">
            <div className="people-list-component-title">Registered People</div>
            <ul className="people-list-component-list">{makeListItems()}</ul>
        </div>
    );
}

export default PeopleListComponent;
