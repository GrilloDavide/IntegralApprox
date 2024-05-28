import { Component } from '@angular/core';
import {  FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CalculatorComponent } from '../calculator/calculator.component';
import { CommonModule } from '@angular/common';
import { requestService } from '../services/request.service';
import { GraphService } from '../services/graph.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ChartComponent, RouterOutlet,MatButtonModule, MatIconModule, MatButtonToggleModule, ReactiveFormsModule, MatInputModule, FormsModule, CalculatorComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private requestService : requestService, public graphService : GraphService) { }
  
  show : boolean = false;
  showGraph : boolean = false;

  resultIsReady : boolean = false;

  codeExpression : string = "";

  time : number = 10;
  value : number = 200;

  errors : boolean = false;
  boundAError : boolean = false;
  boundBError : boolean = false;
  nError : boolean = false;
  functionError : boolean = false;
  methodError : boolean = false;



  form = {
    boundA : 0,
    boundB : 1,
    n : "",
    function : "",
    method : ""
  }

  updateExpression(chosenFunction: string){
    this.form.function = chosenFunction;
    this.show=false;

    console.log(this.cFunctionTranslator(this.form.function))
  }

  updateCodeExpression(codeExpression : string){
    this.codeExpression = codeExpression;
  }
 
  formControl(){
      this.nError = this.form.n == "".trim() || parseInt(this.form.n) < 0;
      this.functionError = this.form.function == "".trim();
      this.methodError = this.form.method == "".trim();

      this.errors = this.boundAError || this.boundBError || this.nError || this.functionError || this.methodError;
  }


  cFunctionTranslator(functionToTranslate: string): string {
    function replaceExponents(expression: string): string {
        const exponentRegex = /(\([^()]+\)|\w+\([^()]+\)|\w+|\d+)(\^\s*)(\([^()]+\)|\w+\([^()]+\)|\w+|\d+)/g;

        return expression.replace(exponentRegex, (match: string, base: string, operator: string, exponent: string) => {
            return `pow(${base}; ${exponent})`;
        });
    }

    let f: string = functionToTranslate;
    console.log(functionToTranslate);

    // Replace special symbols and functions
    f = f.replace(/√/g, "sqrt");
    f = f.replace(/π/g, "M_PI");
    f = f.replace(/\be\b/g, "M_E");
    f = f.replace(/\bln\b/g, "log");
    f = f.replace(/\bsin\b/g, "sin");
    f = f.replace(/\bcos\b/g, "cos");
    f = f.replace(/\btan\b/g, "tan");
    f = f.replace(/\basin\b/g, "asin");
    f = f.replace(/\bacos\b/g, "acos");
    f = f.replace(/\batan\b/g, "atan");
    f = replaceExponents(f);

    console.log(f);
    return f;
}


  onSubmit(){
    this.formControl()


    if(this.form.boundA < this.form.boundB){
      let temp = this.form.boundA
      this.form.boundA = this.form.boundB
      this.form.boundB = temp
      alert("Gli estremi A e B sono stati invertiti")
    }


    if(this.errors)
      return;

if(this.form.boundA < this.form.boundB){
  let temp = this.form.boundA;
  this.form.boundA = this.form.boundB;
  this.form.boundA = temp;
}
  

  console.log(this.form)
  this.requestService.send(this.form.boundA.toString(), this.form.boundB.toString(), this.form.n, this.cFunctionTranslator(this.form.function), this.form.method).subscribe(res => {

    console.log(res)
    let prova : payload = res as any;
    
    this.time = prova.time;
    this.value = prova.value;
       
  });
  this.resultIsReady=!this.resultIsReady;
  }
}

interface payload{
  value : number;
  time : number;
}