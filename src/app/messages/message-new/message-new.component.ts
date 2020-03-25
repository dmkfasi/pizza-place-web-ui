import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-message-new',
  templateUrl: './message-new.component.html',
  styleUrls: ['./message-new.component.css']
})
export class MessageNewComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  priorityCtrl = new FormControl();
  departmentCtrl = new FormControl();

  priorities: string[] = ['High', 'Medium', 'Low'];
  filteredPriorities: Observable<string[]>;

  departments: object[] = [
    {
      id: 1,
      name: 'Warehouse'
    },
    {
      id: 2,
      name: 'Sales'
    },
    {
      id: 3,
      name: 'Accounting'
    },
    {
      id: 4,
      name: 'IT'
    }
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      emailCtrl: ['', Validators.required],
      priorityCtrl: ['', Validators.required],
      departmentCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this.formBuilder.group({
      messageCtrl: ['', Validators.required]
    });

    this.filteredPriorities = this.priorityCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(value))
      );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.priorities.filter(
      priority => priority.toLowerCase().includes(filterValue)
    );
  }

  public getDepartmentName(department: object) {
    return department ? department['name'] : undefined;
  }
}
