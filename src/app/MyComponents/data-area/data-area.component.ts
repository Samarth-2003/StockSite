import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartItem, registerables } from 'chart.js';
import { lastValueFrom } from 'rxjs';
import { DataloaderService } from 'src/app/dataloader.service';
import { StockValue } from '../../../StockValue'


@Component({
  selector: 'app-data-area',
  templateUrl: './data-area.component.html',
  styleUrls: ['./data-area.component.css']
})
export class DataAreaComponent implements OnInit {

  xAxis: string[];
  Y_open: number[];
  Y_close: number[];
  Y_high: number[];
  Y_low: number[];
  display_open:boolean;
  display_close:boolean;
  display_high:boolean;
  display_low:boolean;
  company_id = 'apple';
  _url: string;
  stocks: StockValue[];
  key = '1. open';
  data_type = 'daily'


  constructor(private http: HttpClient, private service: DataloaderService) {
    this.xAxis = [];
    this.Y_open = [1, 2, 3, 4, 5];
    this.Y_close = [1, 2, 3, 4, 5];
    this.Y_high = [1, 2, 3, 4, 5];
    this.Y_low = [1, 2, 3, 4, 5];
    this._url = 'https://my-project-backend-production.up.railway.app/data';
    //this._url = 'http://127.0.0.1:5000/data';
    this.stocks = [];
    this.display_open = true;
    this.display_close = false;
    this.display_high = false;
    this.display_low = false;
  }

  ngOnInit(): void {


    const getData = async () => {
      console.log(this.company_id)
      let data = await this.service.getDataSynchronous(this._url,this.company_id,this.data_type);
      this.stocks = data;
      this.assignNewLabels();
      
      this.displayChart(this.display_open,this.display_close,this.display_high,this.display_low);
    }

    getData();

  }
  Onchange(str:string){
    if(str == 'open'){this.display_open = !this.display_open;}
    if(str == 'close'){this.display_close = !this.display_close;}
    if(str == 'high'){this.display_high = !this.display_high;}
    if(str == 'low'){this.display_low = !this.display_low;}
    

    console.log(str,this.display_open,this.display_close);
    this.displayChart(this.display_open,this.display_close,this.display_high,this.display_low);
  }
  

  ChangeData(str:string){
    this.data_type = str;
    this.ngOnInit();
  }
  refresh(str: string) {
    this.company_id = str;
    this.ngOnInit();
  };

  assignNewLabels(){

    this.xAxis = <string[]>Object.keys(this.stocks);



    this.Y_open.splice(0, this.Y_open.length);
    this.Y_close.splice(0,this.Y_close.length);
    this.Y_high.splice(0,this.Y_high.length);
    this.Y_low.splice(0,this.Y_low.length);

    for (var Key of this.xAxis) {
      var StockObj = this.stocks[Key as keyof typeof this.stocks];
      if (StockObj != null) {
        this.Y_open.push(parseFloat(StockObj['1. open' as keyof typeof StockObj]));
        this.Y_close.push(parseFloat(StockObj['4. close' as keyof typeof StockObj]));
        this.Y_high.push(parseFloat(StockObj['2. high' as keyof typeof StockObj]));
        this.Y_low.push(parseFloat(StockObj['3. low' as keyof typeof StockObj]))
      }
    }
  }

  displayChart(displayOpen: boolean, displayClose: boolean, displayHigh: boolean, displayLow: boolean) {

    var graph = document.getElementById('stock-chart');
    graph?.remove();

    var container = document.getElementById('graph-container');
    container?.insertAdjacentHTML('beforeend', '<canvas id="stock-chart"></canvas>');


   var opening_data  = this.Y_open.slice(-20);
   var closing_data = this.Y_close.slice(-20);
   var high_data = this.Y_high.slice(-20);
   var low_data = this.Y_low.slice(-20);
   var Labels = this.xAxis.slice(-20);

   var Max = Math.ceil(Math.max(...high_data));
   var Min = Math.floor(Math.min(...low_data));
   
    var myChart = new Chart("stock-chart", {
      type: 'line',
      data: {
        labels: Labels,
        datasets: [{
          label: 'opening ',
          data: opening_data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',

          ],
          borderWidth: 2,
          fill: false,
          pointRadius: displayOpen?2:0,
          pointBorderWidth: 0,
          showLine:displayOpen,
          yAxisID : 'open_y',
          pointHitRadius:displayOpen?4:0,
        

        },
        {
          label: 'closing ',
          data: closing_data,
          backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [ 
             'rgba(54, 162, 235, 1)', 
          ],
         borderWidth :2,
          fill: false,
          pointRadius: displayClose?2:0,
          pointBorderWidth: 0,
          yAxisID:'close_y',
          showLine:displayClose,
          pointHitRadius:displayClose?4:0,
          
          

        },
        {
          label: 'high',
          data: high_data,
          backgroundColor: [
             'rgba(255, 206, 86, 0.2)',  
          ],
          borderColor: [
        
             'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 2,
          fill: false,
          pointRadius: displayHigh?2:0,
          pointBorderWidth: 0,
          showLine:displayHigh,
          yAxisID : 'high_y',
          pointHitRadius:displayHigh?4:0,


        },
        {
          label: 'low',
          data: low_data ,
          backgroundColor: [
               'rgba(153, 102, 255, 0.2)', 
          ],
          borderColor: [
           
             'rgba(153, 102, 255, 1)',
            
          ],
          
          pointBackgroundColor:'rgba(153, 102, 255, 1)',
          pointHoverBorderColor:'rgba(153, 102, 255, 1)',
          borderWidth:2,
          fill: false,
          pointRadius: displayLow?2:0,
          pointBorderWidth: 0,
          showLine:displayLow,
          yAxisID : 'low_y',
          pointHitRadius:displayLow?4:0,
   
        },]
      },
      options: {

       
        scales: {
          x: {
            ticks: {
              display: true,
            }
          },
          open_y : {
            
            beginAtZero: true,
            type:'linear',
            position:'left',
            display:true,
            max: Max+10,
            min: Min-10,
            ticks:{
               stepSize:5,
            },
            stacked:false,
          },
          close_y : {
            
            beginAtZero: true,
            type:'linear',
            position:'right',
            display:false,
            max:Max+10,
            min: Min-10,
            ticks:{stepSize:5},
          },
          high_y : {
            
            beginAtZero: true,
            type:'linear',
            position:'right',
            display:false,
            max:Max+10,
            min: Min-10,
            ticks:{
              
              stepSize:5,},
            stacked:false,
          },
          low_y : {
            
            beginAtZero: true,
            type:'linear',
            position:'right',
            display:false,
            max:Max+10,
            min: Min-10,
            ticks:{stepSize:5},
          },
        }
      }
    });
  }

}
