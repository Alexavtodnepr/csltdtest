import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {OwnerService} from "../../shared/owner.service";
import {OwnerEntity} from "../../shared/interfaces";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CarNumberValidator} from "../../shared/validators/car-number.validator";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-owner-page',
  templateUrl: './owner-page.component.html',
  styleUrls: ['./owner-page.component.css']
})
export class OwnerPageComponent implements OnInit, OnDestroy {
  querySub: Subscription;
  view: boolean = false;
  edit: boolean = false;
  add: boolean = false;
  nowYear = (new Date()).getFullYear();
  id: string = '';
  owner$?: OwnerEntity;
  form!: FormGroup;
  formArray!: any[];
  submSub?: Subscription;

  constructor(private fb: FormBuilder, private matSnack: MatSnackBar, private route: ActivatedRoute, private ownerService: OwnerService, private router: Router,) {
    this.querySub = route.queryParams.subscribe(
      (queryParam : any) => {
        if(queryParam['edit']){
          this.id= queryParam.edit;
          this.edit = true;
        }
        if(queryParam['view']){
          this.id= queryParam.view;
          this.view = true;
        }
        if(queryParam['add']){
          this.add = true;
        }
      })
  }

  ngOnInit() {
    this.ownerService.getOwnerById(this.id).subscribe(owner =>{
      this.owner$ = owner;
      this.formArray = owner.aCars;
      if(this.edit){
        this.form = this.fb.group({
          aFirstName: new FormControl(owner.aFirstName, [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]),
          aMiddleName: new FormControl(owner.aMiddleName, [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]),
          aLastName: new FormControl(owner.aLastName, [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]),
          aCars: this.fb.array([]),
        });
        this.setCar();
      }
      if(this.add){
        this.form = this.fb.group({
          aFirstName: new FormControl('', [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]),
          aMiddleName: new FormControl('', [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]),
          aLastName: new FormControl('', [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]),
          aCars: this.fb.array([])
        });
        this.addNewCar();
      }
    });
  }

  submit() {
    if(this.edit){
      const owner = this.form.value;
      owner.id = +this.id;
      this.submSub = this.ownerService.editOwner(owner).subscribe();
      this.matSnack.open(`${owner.aLastName} ${owner.aFirstName} был изменен!!!`, 'Ok', {duration: 5000});
      this.router.navigate(['/']);
    }
    if(this.add){
      const aFirstName = this.form.value.aFirstName;
      const aMiddleName = this.form.value.aMiddleName;
      const aLastName = this.form.value.aLastName;
      const aCars = this.aCar.value;
      this.submSub = this.ownerService.createOwner(aFirstName, aMiddleName, aLastName, aCars).subscribe((owner)=>{
        this.form.reset();
        this.router.navigate(['/']);
        this.matSnack.open(`Владелец ${owner.aFirstName + ' ' + owner.aLastName} был создан!!`, 'Ok', {duration: 5000});
      });
    }
  }

  removeCar(i: number) {
    if(this.aCar.length <= 1){
      this.matSnack.open('Должен быть хотя бы один автомобиль!!', 'Ok', {duration: 2000});
      return;
    }
    this.aCar.removeAt(i);
  }

  getCarsForm(): FormArray{
    return this.form.controls["aCars"] as FormArray;
  }
  getCarRow(i: number){
    return this.getCarsForm().controls[i] as FormGroup;
  }

  get aCar(){
    return this.form.controls["aCars"] as FormArray;
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

  addNewCar(){
    this.aCar.push(this.fb.group({
      carNumber: ['', [Validators.required, Validators.pattern('[A-Z]{2}[0-9]{4}[A-Z]{2}')], [CarNumberValidator(this.ownerService)]],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1990), Validators.max((new Date()).getFullYear())]],
    }));
  };

  ngOnDestroy() {
    if(this.querySub){
      this.querySub.unsubscribe();
    }
    if(this.submSub){
      this.submSub.unsubscribe();
    }
  }
}
