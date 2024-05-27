import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-my-chart',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CanvasJSAngularChartsModule],
  templateUrl: './my-chart.component.html',
  styleUrl: './my-chart.component.scss'
})
export class MyChartComponent {

  @Input() myFunction !: string;

  chartOptions = {
    animationEnabled: true,
    title: {
        text: this.myFunction
    },
    axisY: {
        valueFormatString: "#0,,.",
        suffix: ""
    },
    
    data: [{
        type: "splineArea",
        color: "rgba(54,158,173,.7)",
        xValueFormatString: "YYYY",
        dataPoints: [
            { x: 0, y: 0 }
        ]
    }]
}

functionToEval(){
  this.myFunction.replace("sin", "Math.sin")
  this.myFunction.replace("asin", "Math.asin")
  this.myFunction.replace("cos", "Math.cos")
  this.myFunction.replace("acos", "Math.acos")
  this.myFunction.replace("tan", "Math.tan")
  this.myFunction.replace("atan", "Math.atan")
  this.myFunction.replace("√", "Math.sqrt")
  this.myFunction.replace("π", "Math.PI")
  this.myFunction.replace("ℯ", "Math.E")
}

  generateData(){
    for (let i = -50; i < 50; i++) {
      this.chartOptions.data[0].dataPoints.push({x : i,y : eval(this.myFunction.replace("x",i.toString()))})
    
    }
  }


  
}
