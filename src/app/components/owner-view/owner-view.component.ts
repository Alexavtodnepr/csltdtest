import {Component, OnDestroy, OnInit} from '@angular/core';
import {OwnerService} from "../../shared/owner.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {OwnerEntity} from "../../shared/interfaces";

@Component({
  selector: 'app-owner-view',
  templateUrl: './owner-view.component.html',
  styleUrls: ['./owner-view.component.css']
})
export class OwnerViewComponent implements OnInit, OnDestroy{
  initSub?: Subscription;
  querySub?: Subscription;
  owner$?: OwnerEntity;
  id: string = '';


  constructor(private ownerService: OwnerService, private route: ActivatedRoute ) {
    route.queryParams.subscribe(
      (queryParam : any) => {
          this.id = queryParam['view'];
    })
  }

  ngOnInit(): void {
    this.initSub = this.ownerService.getOwnerById(this.id).subscribe(owner => {
      this.owner$ = owner;
    });
  }

  ngOnDestroy() {
    if(this.initSub){
      this.initSub.unsubscribe();
    }
    if(this.querySub){
      this.querySub.unsubscribe();
    }
  }

}
