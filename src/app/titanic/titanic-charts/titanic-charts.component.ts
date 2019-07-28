import { Component, OnInit, Input, SimpleChanges, OnChanges,DoCheck, KeyValueDiffers } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-titanic-charts',
  templateUrl: './titanic-charts.component.html',
  styleUrls: ['./titanic-charts.component.css']
})
export class TitanicChartsComponent implements OnInit,OnChanges,DoCheck{
  @Input() passengers:any;
  differ: any;
  constructor(private differs: KeyValueDiffers) {
		this.differ = differs.find({}).create();
	}
	highcharts = Highcharts;
  chartOptions:any;

  ngOnInit() {
    this.loadChart();
  }
  pieChartData = [];
  loadChart() {
    this.chartOptions = {   
      chart : {
         plotBorderWidth: null,
         plotShadow: false
      },
      title : {
         text: 'Survival and Passenger Class Chart'   
      },
      tooltip : {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions : {
         pie: {
            allowPointSelect: true,
            cursor: 'pointer',
      
            dataLabels: {
               enabled: false           
            },
      
            showInLegend: true
         }
      },
      series : [{
         type: 'pie',
         name: 'Survival',
         data: this.pieChartData
      }]
   };
  }
    

  servivalInput() {
    this.pieChartData =[];
    if(this.passengers != null && this.passengers.length > 0) { 
      let pclassArr =[0,0,0];
      for(let passenger of this.passengers) {
        if(passenger.pclass > 0)
          pclassArr[passenger.pclass-1] = pclassArr[passenger.pclass-1] + 1; 
      }
      this.pieChartData.push({name:'First Class', y:(pclassArr[0]/(pclassArr[0]+pclassArr[1]+pclassArr[2]))*100});
      this.pieChartData.push({name:'Second Class',y:(pclassArr[1]/(pclassArr[0]+pclassArr[1]+pclassArr[2]))*100});
      this.pieChartData.push({name:'Thrid Class', y:(pclassArr[2]/(pclassArr[0]+pclassArr[1]+pclassArr[2]))*100});
      this.loadChart();
    }  
  }
  ngOnChanges(changes: SimpleChanges) {
    //if(changes.passengers && changes.passengers.previousValue != changes.passengers.currentValue) {
     // this.servivalInput();
    //}
  }
  ngDoCheck() {
    var changes = this.differ.diff(this.passengers);
   if(changes) 
      this.servivalInput();
  }
}
