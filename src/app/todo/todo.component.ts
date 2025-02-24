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

  private fb = inject(FormBuilder)
  
  protected form !: FormGroup

  protected tasks : TodoObject[] = []

  ngOnInit(): void {

    this.form = this.createForm()

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

  protected getFormattedPriority(input: number): string {

    const priorityMap = ["Low", "Medium", "High"]
    return priorityMap[input]

  }

  protected getFormattedDate(input: string): string {

    return formatDate(input, 'MMM dd', 'en-US')

  }

}
