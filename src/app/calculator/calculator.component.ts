import { Component, Output, EventEmitter } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { last } from 'rxjs';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [RouterOutlet, MatGridListModule, MatButtonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {

  @Output() inputFunction = new EventEmitter<string>();
  expression : string = ""; //this is what the user sees
  codeExpression = ""; //this is what the code sees
  lastOperation : string = "";
  amIdecimal : boolean = false;

  editExpression = (operation : string) => {
    
    if(operation.match(/[ ) ]/))                  //check if the user try to put a closed bracket without having opened one
      if(this.codeExpression.indexOf("(") == -1){
        alert("Syntax Error");
  
        return;
      } else if (this.codeExpression.length-1 - this.codeExpression.indexOf("(") == 0){ //check if in the brackets there is something
        alert("Syntax Error");
  
        return;
      }

    if((!this.lastOperation.match(/[0-9]/) && operation === ",") || 
      (this.lastOperation.match(/[ l ( ^ √ ] , /) && operation.match(/[ l ( ^ √ , ]/))){
      alert("Syntax Error");

      return;
    }  
      
    if(this.lastOperation.match(/[0-9 e π ) x !]/) && operation.match(/[s c t S C T e π x l ( ^ √ ]/)) //controllare che prima dei fattoriali ci siano numeri o cose fattoriabili niggers
      this.codeExpression += "*";

    if (operation == "d")
        this.codeExpression = this.codeExpression.substring(0, this.codeExpression.length - 1);
    else
        this.codeExpression += operation;
    
    
    this.lastOperation = operation;
    this.updateExpression();
    
  }

  updateExpression = () => {
    this.expression = this.codeExpression;
    this.expression = this.expression.replaceAll("s", "sin");
    this.expression = this.expression.replaceAll("c", "cos");
    this.expression = this.expression.replaceAll("t", "tan");
    this.expression = this.expression.replaceAll("l", "ln");
    this.expression = this.expression.replaceAll("S", "asin");
    this.expression = this.expression.replaceAll("C", "acos");
    this.expression = this.expression.replaceAll("T", "atan");
  }

  done(){
    

    this.inputFunction.emit(this.expression);
    console.log(this.codeExpression);
  }
}
