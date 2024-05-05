import { Component, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CalculatorComponent } from '../calculator/calculator.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatButtonToggleModule, ReactiveFormsModule, MatInputModule, FormsModule, CalculatorComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  show : boolean = false;

  inputFunction : string = "";


  proprieties = this.formBuilder.group({
    choice: [''],
    inputFunction: ['']
  });

  constructor(private formBuilder: FormBuilder) {}
  
  isAcceptable(){
    console.log(this.proprieties.value)
  }

  updateChosenFunction(chosenFunction: string){
    this.inputFunction= chosenFunction;
  }
  
  fontStyleControl = new FormControl('');
  fontStyle?: string;



  onSubmit(){

  }
}
