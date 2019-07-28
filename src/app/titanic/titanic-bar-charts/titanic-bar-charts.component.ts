import { Component, OnInit, Input, SimpleChanges, OnChanges, KeyValueDiffers,DoCheck } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-titanic-bar-charts',
  templateUrl: './titanic-bar-charts.component.html',
  styleUrls: ['./titanic-bar-charts.component.css']
})
export class TitanicBarChartsComponent implements OnInit,OnChanges,DoCheck {
  @Input() passengers:any;
  highcharts = Highcharts;
  chartOptions:any;
  differ: any;
  constructor(private differs: KeyValueDiffers) {
		this.differ = differs.find({}).create();
	}
  ngOnInit() {
    this.loadChart();
  }
  pieChartData = [];
  loadChart() {
   this.chartOptions = {   
      chart : {
         type:"column",
      },
      title : {
         text: 'passenger Class and Gender Chart'   
      },
      tooltip : {
         pointFormat: ''
      },
      xAxis: {
         categories: ['First Class', 'Second Class', 'Thrid Class']
     },
     yAxis: {
         min: 0,
         title: {
             text: ''
         },
         stackLabels: {
             enabled: true,
 
         }
     },
     legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
      },
      plotOptions : {
         column: {
               stacking: 'normal',
               dataLabels: {
                  enabled: true,
               }   
         }
      },
      series : [{
               name:'Survival',
               type:'column',
               data:this.pieChartData
            }]
   };
  
  }
  servivalInput() {
   this.pieChartData = [];
    if(this.passengers != null && this.passengers.length > 0) { 
      let pclassArr =[0,0,0];
      let pclassServivedArr =[0,0,0];
      for(let passenger of this.passengers) {
        if(passenger.pclass > 0) {
             if(passenger.sex == 'male' || passenger.sex == 'MALE') 
                pclassServivedArr[passenger.pclass-1] = pclassServivedArr[passenger.pclass-1] + 1; 
             else 
                pclassArr[passenger.pclass-1] = pclassArr[passenger.pclass-1] + 1;   
        }  
      }
      this.pieChartData.push([0,pclassServivedArr[0]]);
      this.pieChartData.push([0,pclassArr[0]]);
      this.pieChartData.push([1,pclassServivedArr[1]]);
      this.pieChartData.push([1,pclassArr[1]]);
      this.pieChartData.push([2,pclassServivedArr[2]]);
      this.pieChartData.push([2,pclassArr[2]]);
      this.loadChart();
    } 
  }
  ngOnChanges(changes: SimpleChanges) {
   /*console.log(changes.passengers);
   if(changes.passengers && changes.passengers.previousValue != changes.passengers.currentValue) {
      this.servivalInput();
   }*/
  }
  ngDoCheck() {
      var changes = this.differ.diff(this.passengers);
      if(changes) 
        this.servivalInput();
   }
  
}
