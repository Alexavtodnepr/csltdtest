import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OwnerService} from "../../../shared/owner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {OwnerEntity} from "../../../shared/interfaces";
import {CarNumberValidator} from "../../../shared/validators/car-number.validator";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit, OnDestroy {
  formEdit!: FormGroup;
  formArray!: any[];
  id: string = '';
  nowYear = (new Date()).getFullYear();
  querySub?: Subscription;
  getSub?: Subscription;
  submSub?: Subscription;
  owner$?: OwnerEntity;

  constructor(private ownerService: OwnerService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private matSnack: MatSnackBar) {
    this.querySub = route.queryParams.subscribe(
      (queryParam : any) => {
        this.id = queryParam['edit'];
      })
  }

  ngOnInit(): void {
    this.getSub = this.ownerService.getOwnerById(this.id).subscribe((owner: OwnerEntity) => {
      this.owner$ = owner;
      this.formArray = owner.aCars;
      this.formEdit = this.fb.group({
        aFirstName: new FormControl(owner.aFirstName, [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]),
        aMiddleName: new FormControl(owner.aMiddleName, [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]),
        aLastName: new FormControl(owner.aLastName, [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]),
        aCars: this.fb.array([]),
      });
      this.setCar();
    })
  }
  submit() {
    const ownerEdit = this.formEdit.value;
    ownerEdit.id = +this.id;
    this.submSub = this.ownerService.editOwner(ownerEdit).subscribe();
    this.matSnack.open(`${ownerEdit.aLastName} ${ownerEdit.aFirstName} был изменен!!!`, 'Ok', {duration: 5000});
    this.router.navigate(['/']);
  }

  removeCar(i: number) {
    if(this.aCar.length <= 1){
      this.matSnack.open('Должен быть хотя бы один автомобиль!!', 'Ok', {duration: 2000});
      return;
    }
    this.aCar.removeAt(i);
  }

  getCarsForm(): FormArray{
    return this.formEdit.controls["aCars"] as FormArray;
  }
  getCarRow(i: number){
    return this.getCarsForm().controls[i] as FormGroup;
  }

  get aCar(){
    return this.formEdit.controls["aCars"] as FormArray;
  }
  setCar(){
    this.formArray.forEach(car => {
      const ownerCar = this.fb.group({
        carNumber: [car.carNumber, [Validators.required, Validators.pattern('[A-Z]{2}[0-9]{4}[A-Z]{2}')], [CarNumberValidator(this.ownerService, car.carNumber)]],
        brand: [car.brand, [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]],
        model: [car.model, [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]],
        year: [car.year, [Validators.required, Validators.min(1990), Validators.max(this.nowYear)]],
      })
      this.aCar.push(ownerCar);
    })
  }

  addNewCar() {
    this.aCar.push(this.fb.group({
      carNumber: ['', [Validators.required, Validators.pattern('[A-Z]{2}[0-9]{4}[A-Z]{2}')], [CarNumberValidator(this.ownerService)]],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1990), Validators.max((new Date()).getFullYear())]],
    }));
  };

  ngOnDestroy() {
    if(this.getSub){
      this.getSub.unsubscribe();
    }
    if(this.querySub){
      this.querySub.unsubscribe();
    }
    if(this.submSub){
      this.submSub.unsubscribe();
    }
  }
}
