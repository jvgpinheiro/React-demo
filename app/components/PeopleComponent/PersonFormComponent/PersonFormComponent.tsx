import PersonEntity from 'app/stores/peopleStore/entities/PersonEntity';
import { addPerson } from 'app/stores/peopleStore/PeopleStore';
import { generatePersonID } from 'app/stores/peopleStore/PeopleStore';
import { closeModal } from 'app/stores/modalStore/ModalStore';
import React, { ChangeEvent, FormEvent, useState } from 'react';

export type ComponentProps = { person?: PersonEntity };

let componentLastGlobalID = 0;

function PersonFormComponent({ person }: ComponentProps): JSX.Element {
    const isEditionForm = !!person;
    const componentID = ++componentLastGlobalID;
    const inputLabelBaseClass = `person-form-component-form-container-input__label`;
    const inputValueBaseClass = `person-form-component-form-container-input__value`;
    const [name, setName] = useState<string>(person?.name ?? '');
    const [age, setAge] = useState<string>(`${person?.age}` ?? '');

    function onSubmit(event: FormEvent): void {
        event.preventDefault();
        if (name === '' || !isValidAge(+age)) {
            alert('Invalid data');
            return;
        }
        const id = isEditionForm && person ? person.id : generatePersonID();
        const newPerson = new PersonEntity({ id, name, age: +age });
        addPerson(newPerson);
        clearForm();
        closeModal('person-form');
    }

    function onAgeChange(event: ChangeEvent<HTMLInputElement>): void {
        const newAge = +event.target.value;
        if (!isValidAge(newAge)) {
            const validAge = `${isNaN(newAge) ? 0 : clampAge(newAge)}`;
            return setAge(validAge);
        }
        setAge(`${newAge}`);
    }

    function isValidAge(num: number): boolean {
        const minAge = 0;
        const maxAge = 200;
        return !isNaN(num) && num >= minAge && num <= maxAge;
    }

    function clampAge(num: number): number {
        const minAge = 0;
        const maxAge = 200;
        return Math.min(Math.max(num, minAge), maxAge);
    }

    function clearForm(): void {
        setName('');
        setAge('');
    }

    function close(): void {
        closeModal('person-form');
    }

    return (
        <div className="person-form-component">
            <div className="person-form-component-titlebar">
                <div className="person-form-component-titlebar-title">
                    <span className="person-form-component-titlebar-title-type">
                        {isEditionForm && person ? `Person Edit` : 'Person Registration'}
                    </span>
                    {isEditionForm && person ? (
                        <span className="person-form-component-titlebar-title-id">{`(id: ${person.id})`}</span>
                    ) : undefined}
                </div>
                <span className="person-form-component-titlebar-close" onClick={close}>
                    X
                </span>
            </div>
            <form className="person-form-component-form" onSubmit={onSubmit}>
                <div className="person-form-component-form-container">
                    <div className="person-form-component-form-container-input">
                        <label
                            className={`${inputLabelBaseClass} ${inputLabelBaseClass}--name`}
                            htmlFor={`${inputValueBaseClass}--name-${componentID}`}
                        >
                            Name:
                        </label>
                        <input
                            id={`${inputValueBaseClass}--name-${componentID}`}
                            className={`${inputValueBaseClass} ${inputValueBaseClass}--name`}
                            type="text"
                            name="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        ></input>
                    </div>
                    <div className="person-form-component-form-container-input">
                        <label
                            className={`${inputLabelBaseClass} ${inputLabelBaseClass}--age`}
                            htmlFor={`${inputValueBaseClass}--age-${componentID}`}
                        >
                            Age:
                        </label>
                        <input
                            id={`${inputValueBaseClass}--age-${componentID}`}
                            className={`${inputValueBaseClass} ${inputValueBaseClass}--age`}
                            type="number"
                            name="age"
                            value={age}
                            onChange={onAgeChange}
                        ></input>
                    </div>
                </div>
                <div className="person-form-component-form-buttons">
                    <button className="person-form-component-form-buttons-submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default PersonFormComponent;
