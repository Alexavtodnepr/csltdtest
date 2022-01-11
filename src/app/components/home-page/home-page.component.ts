import {Component, OnDestroy, OnInit} from '@angular/core';
import {OwnerEntity} from "../../shared/interfaces";
import {OwnerService} from "../../shared/owner.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  owners!: OwnerEntity[];
  selected: boolean = false;
  displayedColumns: string[] = [ 'id','firstname', 'middlename', 'lastname', 'cars'];
  selectedOwner: OwnerEntity[] = [];
  modal: boolean = false;
  owner!: OwnerEntity;
  gSub?: Subscription;
  delSub?: Subscription;

  constructor(public ownerService: OwnerService,
              private router: Router,
  ) { }

  ngOnInit(): void {
    this.gSub = this.ownerService.getOwners()
      .subscribe(owners => {
        this.owners = owners;
      });
  }

  selectionThisRow(owner: OwnerEntity) {
    this.selected =true;
    this.selectedOwner.push(owner);
    if(this.selectedOwner.length > 1){
      this.selectedOwner.length = 0;
    }
    this.selected = false;
    return this.owner = owner;
  }

  deleteOwner() {
    if (this.owner.id != null) {
      const id: number = this.owner.id;
      this.delSub = this.ownerService.deleteOwner(+id).subscribe(()=>{
        this.owners = this.owners.filter((owner:any) => owner.id != id)
      });
    }
    this.selectedOwner.length = 0;
    this.selected = false;
  }

  editOwner() {
    this.selectionThisRow(this.owner);
    this.router.navigate(['owner/edit'], {queryParams:{edit: this.owner.id}})
  }

  viewOwner() {
    this.selectionThisRow(this.owner);
    this.router.navigate(['owner/view'], {queryParams:{view: this.owner.id}})
  }

  createOwner() {
    this.router.navigate(['owner'],{queryParams:{add: 'new'}})
  }

  ngOnDestroy() {
    if(this.gSub){
      this.gSub.unsubscribe();
    }
    if(this.delSub){
      this.delSub.unsubscribe();
    }
  }
}
