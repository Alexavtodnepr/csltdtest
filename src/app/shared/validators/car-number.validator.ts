import {OwnerService} from "../owner.service";
import {AbstractControl, AsyncValidatorFn, FormArray, ValidationErrors} from "@angular/forms";
import {map, Observable} from "rxjs";
import {CarEntity, OwnerEntity} from "../interfaces";

export function CarNumberValidator(ownerService: OwnerService, carNum?: string, car?: FormArray): AsyncValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>=> {
    let carNumber: string[] = [];
    if(car !== undefined){
      car.value.map((car: CarEntity) =>{
        carNumber.push(car.carNumber);
      });
    }
    let value: string = control.value;
    return ownerService.getOwners()
      .pipe(
        map( (owners:OwnerEntity[])=> {
          if(carNum == value){
            return null;
          }
        owners.map( owner => owner.aCars.map(car=> carNumber.push(car.carNumber)));
          return carNumber.includes(value)? {carNumber: true} : null;
        })
      )
  }
}
