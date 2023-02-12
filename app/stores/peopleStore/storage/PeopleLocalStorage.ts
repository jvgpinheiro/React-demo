import PersonEntity, { PersonBaseInfoInterface } from '../entities/PersonEntity';

export type ParsedData = { lastValidID: number; list: Array<SavablePersonEntity> };
export type SavablePersonEntity = { entity: PersonEntity; isDeleted: boolean };
type AnyStoredData = { version: number; [key: string]: any };
type StoredDataV1 = { version: 1; registeredPeople: Array<PersonBaseInfoInterface> };
type StoredDataV2 = { version: 2; lastValidID: number; registeredPeople: Array<SavablePersonEntity> };
type ReaderCallback = (data: AnyStoredData) => ParsedData;
type WriterCallback = (data: Array<SavablePersonEntity>) => void;

const versionReaders = new Map<number, ReaderCallback>([
    [1, readConfigV1],
    [2, readConfigV2],
]);
const versionWriters = new Map<number, WriterCallback>([
    [1, writeDataV1],
    [2, writeDataV2],
]);
const currentStorageVersion = 2;

export function load(): ParsedData {
    try {
        const storedPeople = localStorage.getItem('people');
        if (!storedPeople) {
            return { lastValidID: 1, list: [] };
        }
        const parsedData: AnyStoredData = JSON.parse(storedPeople);
        const readerCallback = versionReaders.get(parsedData.version);
        if (!readerCallback) {
            throw new Error('PeopleLocalStorage: VersionReader not found');
        }
        return readerCallback(parsedData);
    } catch (err) {
        console.error(err);
        return { lastValidID: 1, list: [] };
    }
}

function readConfigV1(data: AnyStoredData): ParsedData {
    const { registeredPeople } = data as StoredDataV1;
    const peopleList = registeredPeople.map((person) => ({ entity: new PersonEntity(person), isDeleted: false }));
    const lastValidID = peopleList.reduce((maxID, person) => {
        return Math.max(person.entity.id, maxID);
    }, 1);
    return { lastValidID, list: peopleList };
}

function readConfigV2(data: AnyStoredData): ParsedData {
    const { registeredPeople, lastValidID } = data as StoredDataV2;
    return { lastValidID, list: registeredPeople };
}

export function save(peopleList: Array<SavablePersonEntity>): void {
    const writerCallback = versionWriters.get(currentStorageVersion);
    writerCallback && writerCallback(peopleList);
}

function writeDataV1(peopleList: Array<SavablePersonEntity>): void {
    const registeredPeople = peopleList.filter((person) => !person.isDeleted).map((person) => person.entity);
    const data: StoredDataV1 = { version: 1, registeredPeople };
    const dataToStore = JSON.stringify(data);
    localStorage.setItem('people', dataToStore);
}

function writeDataV2(peopleList: Array<SavablePersonEntity>): void {
    const lastValidID = peopleList.reduce((maxID, person) => {
        return Math.max(person.entity.id, maxID);
    }, 1);
    const data: StoredDataV2 = { version: 2, lastValidID, registeredPeople: peopleList };
    const dataToStore = JSON.stringify(data);
    localStorage.setItem('people', dataToStore);
}
