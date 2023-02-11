export interface PersonBaseInfoInterface {
    readonly id: number;
    readonly name: string;
    readonly age: number;
}

class PersonEntity implements PersonBaseInfoInterface {
    public readonly id: number;
    public readonly name: string;
    public readonly age: number;

    constructor({ id, name, age }: PersonBaseInfoInterface) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
}

export default PersonEntity;
