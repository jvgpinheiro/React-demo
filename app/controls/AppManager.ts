import { PersonBaseInfoInterface } from 'app/stores/peopleStore/entities/PersonEntity';
import { addPerson, deletePerson } from 'app/stores/peopleStore/PeopleStore';

class AppManager {
    public addPerson(personInfo: PersonBaseInfoInterface): void {
        addPerson(personInfo);
    }

    public deletePerson(personInfo: PersonBaseInfoInterface): void {
        deletePerson(personInfo);
    }
}

export default new AppManager();
