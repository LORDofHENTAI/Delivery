import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    'userLogin': new FormControl(),
    'userPassword': new FormControl()
  });

  constructor() { }
  ngOnInit(): void {

  }
}
