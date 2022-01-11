import { Injectable } from '@angular/core';
import {CarEntity, ICarOwnersService, OwnerEntity} from "./interfaces";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OwnerService implements ICarOwnersService{
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private ownersUrl = 'api/owners';

  constructor( private http: HttpClient) { }

  getOwners():Observable<OwnerEntity[]>{
    return this.http.get<OwnerEntity[]>(this.ownersUrl)
  }

  getOwnerById(aId: string): Observable<OwnerEntity>{
    return this.http.get<OwnerEntity>(`${this.ownersUrl}/${aId}`)
  }

  createOwner(
    aFirstName: string,
    aMiddleName: string,
    aLastName: string,
    aCars: CarEntity[]): Observable<OwnerEntity>{
    return this.http
      .post<OwnerEntity>(this.ownersUrl, {
        aFirstName: aFirstName,
        aMiddleName: aMiddleName,
        aLastName: aLastName,
        aCars: aCars
      }, {headers: this.headers})
  }

  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity>{
    return this.http.put<OwnerEntity>(`${this.ownersUrl}/${aOwner.id}` , aOwner , {headers: this.headers})
  }

  deleteOwner(aOwnerId: number): Observable<OwnerEntity[]>{
    return this.http.delete<OwnerEntity[]>(`${this.ownersUrl}/${aOwnerId}`, {headers: this.headers});
  }



}
