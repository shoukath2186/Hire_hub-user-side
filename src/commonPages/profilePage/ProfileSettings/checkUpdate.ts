import { UserDataUpdate } from '../../../datatypes.ts/IUpdateForm';

export default function checkChanges(orgValue: UserDataUpdate, newValue: UserDataUpdate): any {
    const changes: any = {};
    // console.log(1111,orgValue);
    // console.log(3333,newValue);
    
    
    for (const key in newValue) {
        if (newValue.hasOwnProperty(key)) {
            const newVal = newValue[key as keyof UserDataUpdate];
            const oldVal = orgValue[key as keyof UserDataUpdate];

          
            if (newVal !== oldVal) {
                changes[key as keyof UserDataUpdate] = newVal;
            }
        }
    }
    // console.log(changes);


    

     return changes;
}
