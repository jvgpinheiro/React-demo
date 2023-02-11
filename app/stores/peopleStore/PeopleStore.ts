import PersonEntity, { PersonBaseInfoInterface } from './entities/PersonEntity';

type SubscriberCallback = (peopleMap: Array<PersonEntity>) => void;
type PeopleMap = Map<number, PersonEntity>;
type AnyStoredData = { version: number; [key: string]: any };
type StoredDataV1 = { version: 1; registeredPeople: Array<PersonBaseInfoInterface> };

const peopleMap: PeopleMap = new Map();
const listeners = new Set<SubscriberCallback>();
const versionReaders = new Map<number, (data: AnyStoredData) => void>([[1, readConfigV1]]);

loadFromLocalStorage();

function loadFromLocalStorage(): void {
    const storedPeople = localStorage.getItem('people');
    if (!storedPeople) {
        return;
    }
    const parsedData: AnyStoredData = JSON.parse(storedPeople);
    const readerCallback = versionReaders.get(parsedData.version);
    readerCallback && readerCallback(parsedData);
}

function readConfigV1(data: AnyStoredData): void {
    const { registeredPeople } = data as StoredDataV1;
    registeredPeople.forEach((person) => {
        peopleMap.set(person.id, new PersonEntity(person));
    });
}

function saveOnLocalStorage(): void {
    const data: StoredDataV1 = { version: 1, registeredPeople: getPeopleList() };
    const dataToStore = JSON.stringify(data);
    console.log(dataToStore);
    localStorage.setItem('people', dataToStore);
}

export function addPerson(person: PersonBaseInfoInterface): void {
    peopleMap.set(person.id, person);
    console.log('Add');
    saveOnLocalStorage();
    notifyChanges();
}

export function deletePerson(person: PersonBaseInfoInterface): void;
export function deletePerson(personID: number): void;
export function deletePerson(person: PersonBaseInfoInterface | number): void {
    const id = getID(person);
    peopleMap.delete(id);
    console.log('Remove');
    saveOnLocalStorage();
    notifyChanges();
}

export function exists(person: PersonBaseInfoInterface): boolean;
export function exists(personID: number): boolean;
export function exists(person: PersonBaseInfoInterface | number): boolean {
    const id = getID(person);
    return peopleMap.has(id);
}

function getID(person: PersonBaseInfoInterface | number): number {
    return typeof person === 'number' ? person : person.id;
}

export function getPeopleList(): Array<PersonEntity> {
    return [...peopleMap.values()];
}

function notifyChanges(): void {
    listeners.forEach((callback) => callback(getPeopleList()));
}

export function subscribe(callback: SubscriberCallback): void {
    listeners.add(callback);
}

export function unsubscribe(callback: SubscriberCallback): void {
    listeners.delete(callback);
}
