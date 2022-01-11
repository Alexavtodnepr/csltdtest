import { Injectable } from '@angular/core';
import {OwnerEntity} from "./interfaces";
import {Observable} from "rxjs";
import {InMemoryDbService} from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemoryWebApiService implements InMemoryDbService{

  createDb(): {} | Observable<{}> | Promise<{}> {
    const owners= [
      {id: 6, aLastName: 'Иванов', aMiddleName: 'Иванович', aFirstName: 'Иван', aCars: [
          {ownerID: 6, carNumber: 'AI5238IO', brand: 'Renault', model: 'Clio', year: 2004},
          {ownerID: 6, carNumber: 'AI3238AI', brand: 'Vaz', model: 'Clio', year: 2004},
          {ownerID: 6, carNumber: 'AI2348IE', brand: 'Nissan', model: 'Clio', year: 2004},
          {ownerID: 6, carNumber: 'AI1238IT', brand: 'BMW', model: 'Clio', year: 2004},
        ]},
      {id: 5,aLastName: 'Петрова', aFirstName: 'Наталья', aMiddleName: 'Игоревна', aCars: [
          {ownerID: 5, carNumber: 'AX5238IO', brand: 'Renault', model: 'Clio', year: 2004},
          {ownerID: 5, carNumber: 'AX3238AI', brand: 'Vaz', model: 'Clio', year: 2003},
          {ownerID: 5, carNumber: 'AA2348IE', brand: 'Nissan', model: 'Clio', year: 2008},
          {ownerID: 5, carNumber: 'AX1238IT', brand: 'BMW', model: 'Clio', year: 2009},
        ]},
      {id: 4,aLastName: 'Гадя', aFirstName: 'Петрович', aMiddleName: 'Хренова', aCars: [
          {ownerID: 4, carNumber: 'AE2348IE', brand: 'Nissan', model: 'Clio', year: 2008},
          {ownerID: 4, carNumber: 'AE1238IT', brand: 'BMW', model: 'Clio', year: 2009},
        ]},
      {id: 3,aLastName: 'Пупкин', aFirstName: 'Василий', aMiddleName: 'Алибабаевич', aCars: [
          {ownerID: 3, carNumber: 'CA3238AI', brand: 'Vaz', model: 'Clio', year: 2003},
          {ownerID: 3, carNumber: 'CA2348IE', brand: 'Nissan', model: 'Clio', year: 2008},
          {ownerID: 3, carNumber: 'CA1238IT', brand: 'BMW', model: 'Clio', year: 2009},

        ]},
      {id: 2,aLastName: 'Сын', aFirstName: 'Сестры', aMiddleName: 'Племянник', aCars: [
          {ownerID: 2, carNumber: 'AC1238IT', brand: 'BMW', model: 'Clio', year: 2009}
        ]},
      {id: 1,aLastName: 'Отец', aFirstName: 'Сын', aMiddleName: 'Бабули', aCars: [
          {ownerID: 1, carNumber: 'BI5238IO', brand: 'Renault', model: 'Clio', year: 2004},
          {ownerID: 1, carNumber: 'BI3238AI', brand: 'Vaz', model: 'Clio', year: 2003},
          {ownerID: 1, carNumber: 'BI2348IE', brand: 'Nissan', model: 'Clio', year: 2008},
          {ownerID: 1, carNumber: 'BI1238IT', brand: 'BMW', model: 'Clio', year: 2009},
          {ownerID: 1, carNumber: 'BI6238IO', brand: 'Renault', model: 'Clio', year: 2004},
          {ownerID: 1, carNumber: 'BI7238AI', brand: 'Vaz', model: 'Clio', year: 2003},
          {ownerID: 1, carNumber: 'BI8348IE', brand: 'Nissan', model: 'Clio', year: 2008},
          {ownerID: 1, carNumber: 'BI9238IT', brand: 'BMW', model: 'Clio', year: 2009},

        ]},
    ];
    return {owners};
  }

  // genId(owner: any): number{
  //   // @ts-ignore
  //   return owner.length > 0 ? Math.max(...owner.map<number>(owner => +owner.id)) + 1 : 11;
  // }
}
