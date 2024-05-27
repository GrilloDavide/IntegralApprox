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

  @Input() function !: string;

  chartOptions = {
    animationEnabled: true,
    title: {
        text: "Music Album Sales by Year"
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
  this.function.replace("sin", "Math.sin")
}

generateData(){
  for (let i = -50; i < 50; i++) {
    this.chartOptions.data[0].dataPoints.push({x : i,y : eval(this.function.replace("x",i.toString()))})
  
  }
}

}
