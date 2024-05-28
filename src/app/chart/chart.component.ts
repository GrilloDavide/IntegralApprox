import { Component, OnInit, Input } from '@angular/core';
import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {
  data: any;

  options: any;
  
  @Input() compiledForm! : form;

  ngOnInit() {

      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      
      this.data = {
          labels: [],
          datasets: [{
              data: [],
              label: 'f(x)',
              tension: 0.4,
              pointStyle: false,
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              
          }]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 1.6,
        spanGaps: true,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        elements: {
            point: {
                borderWidth: 0,
                radius: 10,
                backgroundColor: 'rgba(0,0,0,0)'
            }
        },
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                ticks: {
                    min: -20,
                    max: 40,
                    stepSize: 5 // Set an appropriate step size for ticks
                }
            }]
        }
      };

this.generateValues(this.functionTranslator(this.compiledForm.function))
  }

  
  functionTranslator(functionToTranslate: string): string {
    function replaceExponents(expression: string): string {
        const exponentRegex = /(\([^()]+\)|\w+|\d+)\^(\([^()]+\)|\w+|\d+)/g;

        return expression.replace(exponentRegex, (match: string, base: string, exponent: string) => {
            base = replaceExponents(base);
            exponent = replaceExponents(exponent);
            return `${base} ** ${exponent}`;
        });
    }

    let f: string = functionToTranslate;
    console.log(functionToTranslate);
    f = f.replace(/√/g, "Math.sqrt");
    f = f.replace(/π/g, "Math.PI");
    f = f.replace(/\be\b/g, "Math.E");
    f = f.replace(/\bln\b/g, "Math.log");
    f = f.replace(/\bsin\b/g, "Math.sin");
    f = f.replace(/\bcos\b/g, "Math.cos");
    f = f.replace(/\btan\b/g, "Math.tan");
    f = f.replace(/\basin\b/g, "Math.asin");
    f = f.replace(/\bacos\b/g, "Math.acos");
    f = f.replace(/\batan\b/g, "Math.atan");
    f = replaceExponents(f);

    console.log(f);
    return f;
}

  generateValues(f : string){
   
    for (let index = 0; index < 62; index+=0.5) {
      this.data.labels[index]= index-30;
      this.data.datasets[0].data[index] = eval(f.replaceAll("x",(index-30).toString()))
     
      
      
    }

    console.log(this.data.labels)
    console.log(this.data.datasets[0])
  }
}


interface form{
  boundA : number,
  boundB : number,
  n : string,
  function : string,
  method : string
}