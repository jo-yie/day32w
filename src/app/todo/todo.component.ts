import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoObject } from '../models';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: false,
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
[x: string]: any;

  private fb = inject(FormBuilder)
  
  protected form !: FormGroup

  protected minDate?: string;

  protected tasks : TodoObject[] = []

  ngOnInit(): void {

    this.form = this.createForm()

    const today = new Date()
    this.minDate = today.toISOString().split('T')[0] // yyyy-MM-dd

  }
  
  // date validation unfinished
  private createForm(): FormGroup {

    return this.fb.group ({

      description: this.fb.control<string>("", [ Validators.required, Validators.minLength(5) ]), 
      priority: this.fb.control<number>(0, [ Validators.required ]), 
      due: this.fb.control<string>("", [ Validators.required ])

    })

  }

  protected processForm(): void {

    const value: TodoObject = this.form.value
    this.tasks.push(value)

    // console.log(">>>> Values: ", value)
    // console.log(">>>> Tasks: ", this.tasks)

  }

  protected isCtrlValid(ctrl: string): boolean {
    // return !!this.form.get(ctrl)?.valid

    const control = this.form.get(ctrl);
    return !!control && control.valid && (control.touched || control.dirty);

  }

  protected isCtrlInvalid(ctrl: string): boolean {
    // return !!this.form.get(ctrl)?.invalid

    const control = this.form.get(ctrl);
    return !!control && control.invalid && (control.touched || control.dirty);

  }

  // // convenience getter for easy access to form fields
  // get f() {
  //   return this.form.controls
  // }

  get descriptionControl() {
    return this.form.get('description')
  }

  get dueControl() {
    return this.form.get('due')
  }

  protected getFormattedPriority(input: number): string {

    const priorityMap = ["Low", "Medium", "High"]
    return priorityMap[input]

  }

  protected getFormattedDate(input: string): string {

    return formatDate(input, 'MMM dd', 'en-US')

  }

}
