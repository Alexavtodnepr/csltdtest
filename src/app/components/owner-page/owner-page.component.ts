import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-owner-page',
  templateUrl: './owner-page.component.html',
  styleUrls: ['./owner-page.component.css']
})
export class OwnerPageComponent implements OnDestroy {
  querySub: Subscription;
  view: boolean = false;
  edit: boolean = false;
  add: boolean = false;

  constructor(private route: ActivatedRoute) {
    this.querySub = route.queryParams.subscribe(
      (queryParam : any) => {
        if(queryParam['edit']){
          this.edit = true;
        }
        if(queryParam['view']){
          this.view = true;
        }
        if(queryParam['add']){
          this.add = true;
        }
      })
  }

  ngOnDestroy() {
    if(this.querySub){
      this.querySub.unsubscribe();
    }
  }

}
