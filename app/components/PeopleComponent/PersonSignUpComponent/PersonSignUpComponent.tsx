import PersonEntity from 'app/stores/peopleStore/entities/PersonEntity';
import { addPerson } from 'app/stores/peopleStore/PeopleStore';
import { generatePersonID } from 'app/stores/peopleStore/PeopleStore';
import React, { ChangeEvent, FormEvent, useState } from 'react';

let componentLastGlobalID = 0;

function PersonSignUpComponent(): JSX.Element {
    const componentID = ++componentLastGlobalID;
    const inputLabelBaseClass = `person-signup-component-form-input__label`;
    const inputValueBaseClass = `person-signup-component-form-input__value`;
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');

    function onSubmit(event: FormEvent): void {
        event.preventDefault();
        if (name === '' || !isValidAge(+age)) {
            alert('Invalid data');
            return;
        }
        const person = new PersonEntity({ id: generatePersonID(), name, age: +age });
        addPerson(person);
        clearForm();
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

    return (
        <div className="person-signup-component">
            <form className="person-signup-component-form" onSubmit={onSubmit}>
                <div className="person-signup-component-form-input">
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
                <div className="person-signup-component-form-input">
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
                <button>Submit</button>
            </form>
        </div>
    );
}

export default PersonSignUpComponent;
