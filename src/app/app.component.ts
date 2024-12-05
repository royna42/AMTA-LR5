import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyValidator } from './my.validator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'my-app2';

  form!: FormGroup
  ngOnInit() {
    this.form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required, MyValidator.restrictedEmails]),
    password: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
    address: new FormGroup({
      country: new FormControl('ua'),
      city: new FormControl('Запорожье', [Validators.required, Validators.minLength(3)])
    }),
    skills: new FormArray([])
  })
}

  setCapital() {
    const mapCity: {[index: string]:any} = {
      ua: "Киев",
      pl: "Варшава",
      de: "Берлин"
    }
    const getCity = this.form!.get('address')!.value.country
    this.form!.get('address')!.patchValue({city: mapCity[getCity]});
  }

  addSkill() {
    const control = new FormControl('', Validators.required);
    (<FormArray>this.form.get('skills')).push(control);
  }

  removeSkill(index: number) {
    (<FormArray>this.form.get('skills')).removeAt(index);
  }

  getControls() {
    return (this.form.get('skills') as FormArray).controls;
  }

  submit() {
    const formControl = {...this?.form?.value}
    console.log(formControl)
    this.form.reset()
  }
}