import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatButtonToggleModule, ReactiveFormsModule, MatInputModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  proprieties = this.formBuilder.group({
    choice: [''],
    inputFunction: ['']
  });

  constructor(private formBuilder: FormBuilder) {}
  
  isAcceptable(){
    console.log(this.proprieties.value)
  }
  
  fontStyleControl = new FormControl('');
  fontStyle?: string;



  onSubmit(){

  }
}
