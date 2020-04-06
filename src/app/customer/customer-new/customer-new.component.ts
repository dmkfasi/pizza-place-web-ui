import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.css']
})
export class CustomerNewComponent implements OnInit {
  emailControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  
  constructor() { }
  
  ngOnInit(): void {
  }
}
