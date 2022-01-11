import {OwnerService} from "../owner.service";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {map, Observable} from "rxjs";
import {OwnerEntity} from "../interfaces";

export function CarNumberValidator(ownerService: OwnerService, carNum?: any): AsyncValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>=> {
    let carNumber: string[] = [];
    let value: string = control.value;
    return ownerService.getOwners()
      .pipe(
        map( (owners:OwnerEntity[])=> {
          if(carNum == value){
            return null;
          }
        owners.map( owner => owner.aCars.map(car=> carNumber.push(car.carNumber)));
          return carNumber.includes(value) ? {carNumber: true} : null;
        })
      )
  }
}
