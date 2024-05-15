import { Component } from '@angular/core';
import {  FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CalculatorComponent } from '../calculator/calculator.component';
import { CommonModule } from '@angular/common';
import { requestService } from '../request.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatButtonToggleModule, ReactiveFormsModule, MatInputModule, FormsModule, CalculatorComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private requestService : requestService) { }
  
  show : boolean = false;
  boundAError : boolean = false;
  boundBError : boolean = false;
  functionError : boolean = false;
  methodError : boolean = false;


  methods = ["Rettangoli", "Triangoli", "Parabole"];
  aria_labels = ["right", "center", "left"];

  form = {
    boundA : "",
    boundB : "",
    function : "",
    method : ""
  }

  updateChosenFunction(chosenFunction: string){
    this.form.function = chosenFunction;
    this.show=false;
  }
 
  formControl(){
      this.boundAError = this.form.boundA == "";
      this.boundBError = this.form.boundB == "";
      this.functionError = this.form.function == "";
      this.methodError = this.form.method == "";
  }

  cFunctionTranslator(functionToTranslate : string){
    let f = functionToTranslate;

    f = f.replace("√", "sqrt");
    f = f.replace("π", "M_PI");
    f = f.replace("e", "M_E");

    console.log(f)
    return f;
  }

  onSubmit(){
    this.formControl()

    if(this.boundAError || this.boundBError || this.functionError || this.methodError)
      return;



    this.requestService.send(this.form.boundA, this.form.boundB, this.cFunctionTranslator(this.form.function), this.form.method).subscribe(res => {

      console.log(res)
    });
  }
}
