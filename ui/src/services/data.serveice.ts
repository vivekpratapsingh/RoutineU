import {Injectable} from '@angular/core';

@Injectable()
export class DataService{
    sharedData : any;
    
    //add updated macros to user details
    addUpdatedMacros(macros:any,updatedMacros:any) : any{
        macros.carbohydrate = updatedMacros.carbohydrate;
        macros.protein = updatedMacros.protein;
        macros.fat = updatedMacros.fat;
        return macros;
    }
}