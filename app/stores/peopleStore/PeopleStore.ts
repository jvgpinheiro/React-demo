import PersonEntity, { PersonBaseInfoInterface } from './entities/PersonEntity';
import { load, save, SavablePersonEntity } from './storage/PeopleLocalStorage';

type SubscriberCallback = (peopleMap: Array<PersonEntity>) => void;
type PeopleMap = Map<number, SavablePersonEntity>;

const { lastValidID, mapData } = makeStoreData();
let uniquePersonID: number = lastValidID + 1;
const peopleMap: PeopleMap = new Map(mapData);
const listeners = new Set<SubscriberCallback>();
notifyChanges();

function makeStoreData(): { lastValidID: number; mapData: Array<Readonly<[number, SavablePersonEntity]>> } {
    const storedDataOnStart = load();
    const mapData = storedDataOnStart.list.map(
        (savablePersonEntity) => [savablePersonEntity.entity.id, savablePersonEntity] as const,
    );
    return {
        lastValidID: storedDataOnStart.lastValidID,
        mapData,
    };
}

export function addPerson(person: PersonBaseInfoInterface): void {
    peopleMap.set(person.id, { entity: person, isDeleted: false });
    save([...peopleMap.values()]);
    notifyChanges();
}

export function deletePerson(person: PersonBaseInfoInterface): void;
export function deletePerson(personID: number): void;
export function deletePerson(person: PersonBaseInfoInterface | number): void {
    const id = getID(person);
    const storedPerson = peopleMap.get(id);
    if (!storedPerson) {
        return;
    }
    peopleMap.set(id, { ...storedPerson, isDeleted: true });
    save([...peopleMap.values()]);
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
    return [...peopleMap.values()].filter((person) => !person.isDeleted).map((person) => person.entity);
}

export function generatePersonID(): number {
    return uniquePersonID++;
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
