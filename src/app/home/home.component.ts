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
 

  onSubmit(){
    console.log(this.form)

    this.requestService.send(this.form.boundA, this.form.boundB, this.form.function, this.form.method).subscribe(res => {

      console.log(res)
    });
  }
}
