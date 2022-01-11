import {Observable} from "rxjs";

export interface OwnerEntity {
  id?: number;
  aFirstName: string;
  aMiddleName: string;
  aLastName: string;
  aCars: CarEntity[];
}

export interface ICarOwnersService {
  getOwners(): Observable<OwnerEntity[]>;
  getOwnerById(aId: string): Observable<OwnerEntity>;
  createOwner(
    aFirstName: string,
    aMiddleName: string,
    aLastName: string,
    aCars: CarEntity[]
  ): Observable<OwnerEntity>;
  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity>;
  deleteOwner(aOwnerId: number): Observable<OwnerEntity[]>;
}

export interface CarEntity {
  carNumber: string;
  brand: string;
  model: string;
  year: number;
}
