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
import { MyChartComponent } from '../my-chart/my-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MyChartComponent, RouterOutlet,MatButtonModule, MatIconModule, MatButtonToggleModule, ReactiveFormsModule, MatInputModule, FormsModule, CalculatorComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private requestService : requestService, public graphService : GraphService) { }
  
  show : boolean = false;

  resultIsReady : boolean = false;

  codeExpression : string = "";

  time !: number;
  value !: number;

  errors : boolean = false;
  boundAError : boolean = false;
  boundBError : boolean = false;
  nError : boolean = false;
  functionError : boolean = false;
  methodError : boolean = false;


  methods = ["Rettangoli", "Triangoli", "Parabole"];
  aria_labels = ["right", "center", "left"];

  form = {
    boundA : 0,
    boundB : 0,
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
      this.boundAError = this.form.boundA < 0;
      this.boundBError = this.form.boundB < 0;
      this.nError = this.form.n == "".trim() || parseInt(this.form.n) < 0;
      this.functionError = this.form.function == "".trim();
      this.methodError = this.form.method == "".trim();
      this.errors = this.form.boundA < 0 || this.form.boundB < 0 || this.form.n == "".trim() ||  parseInt(this.form.n) < 0 || this.form.function == "".trim() || this.form.method == "".trim();
  }

  expressionPowFix(f : string){
    let stringa  = f
    let pos = f.indexOf("^")

    let exprToPow;

    if (stringa[pos - 1] == 'x') {

        exprToPow = "x"
    }
    else if (stringa[pos - 1] == ')') {

        let open_bracket = 0;
        for (let i = pos; i >= 0; i--) {
            
            if (stringa[i] == '(')
                open_bracket = i;
        }

        exprToPow = stringa.substring(open_bracket, pos);
    }
    else{
      this.form.function = ""
      alert("potenza non valida, utilizzare gli alert")
    }
  }

  cFunctionTranslator(functionToTranslate : string){
    let f = functionToTranslate;

    f = f.replace("√", "sqrt");
    f = f.replace("π", "M_PI");
    f = f.replace("e", "M_E");
    f = f.replace("ln", "Math.log");
    f = f.replace(/(\d+)\^(\d+)/g, 'Math.pow($1, $2)')
    console.log(f)
    return f;
  }

  onSubmit(){
    this.formControl()

    if(this.boundAError || this.boundBError || this.nError || this.functionError || this.methodError)
      return;



    this.requestService.send(this.form.boundA.toString(), this.form.boundB.toString(), this.form.n, this.cFunctionTranslator(this.form.function), this.form.method).subscribe(res => {

      console.log(res)
      console.log(JSON.stringify(res))

      /* this.resultIsReady = true
      
      
      
      */
    });
  }
}
