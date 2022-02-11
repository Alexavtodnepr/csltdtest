import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OwnerService} from "../../../shared/owner.service";
import {Router} from "@angular/router";
import {CarNumberValidator} from "../../../shared/validators/car-number.validator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-owner-add',
  templateUrl: './owner-add.component.html',
  styleUrls: ['./owner-add.component.css']
})
export class OwnerAddComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  carForm!: FormGroup;
  nowYear = (new Date()).getFullYear();
  submSub?: Subscription;

  constructor(private fb: FormBuilder, private ownerService: OwnerService, private router: Router, private matSnack: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      aFirstName: new FormControl('', [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]),
      aMiddleName: new FormControl('', [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]),
      aLastName: new FormControl('', [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]),
      aCar: this.fb.array([])
    })
    this.addCar();
  }

  submit() {
    const aFirstName = this.form.value.aFirstName;
    const aMiddleName = this.form.value.aMiddleName;
    const aLastName = this.form.value.aLastName;
    const aCars = this.aCar.value;
    this.submSub = this.ownerService.createOwner(aFirstName, aMiddleName, aLastName, aCars).subscribe((owner)=>{
      this.form.reset();
      this.router.navigate(['/']);
      this.matSnack.open(`Владелец ${owner.aFirstName + ' ' + owner.aLastName} был создан!!`, 'Ok', {duration: 5000});
    })
  }

  removeCar(i: number) {
    if(this.aCar.length <= 1){
      this.matSnack.open('Должен быть хотя бы один автомобиль!!', 'Ok', {duration: 2000});
      return;
    }
    this.aCar.removeAt(i);
  }

  get aCar(){
    return this.form.controls["aCar"] as FormArray;
  }

  addCar() {
    this.carForm = this.fb.group({
      carNumber: ['', [Validators.required, Validators.pattern('[A-Z]{2}[0-9]{4}[A-Z]{2}')], [CarNumberValidator(this.ownerService)]],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1990), Validators.max(this.nowYear)]],
    })
    this.aCar.push(this.carForm);
  }

  getCarsForm(): FormArray{
    return this.form.controls["aCar"] as FormArray;
  }
  getCarRow(i: number){
    return this.getCarsForm().controls[i] as FormGroup;
  }

  ngOnDestroy() {
    this.submSub?.unsubscribe();
  }
}

