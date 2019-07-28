import { Component, OnInit, Input,ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import {TitanicService} from '../../services/titanic.service';
@Component({
  selector: 'app-titanic-grid',
  templateUrl: './titanic-grid.component.html',
  styleUrls: ['./titanic-grid.component.css']
})
export class TitanicGridComponent implements OnInit {
  @ViewChild('myGrid', {static: false}) myGrid: jqxGridComponent;
  constructor(private titanicService:TitanicService) { }

  ngOnInit() {
  }
  genderSource:any={datatype: 'array',
  datafields: [
      { name: 'label', type: 'string' },
      { name: 'value', type: 'string' }
  ],
  localdata:[{label:'MALE',value:'male'},{label:'FEMALE',value:'female'}]}
  genderAdapter: any = new jqx.dataAdapter(this.genderSource, { autoBind: true });

  servivedSource:any={datatype: 'array',
  datafields: [
      { name: 'label', type: 'string' },
      { name: 'value', type: 'string' }
  ],
  localdata:[{label:'Servived',value:1},{label:'Not Servived',value:0}]}
  servivedAdapter: any = new jqx.dataAdapter(this.servivedSource, { autoBind: true });

  classSource:any={datatype: 'array',
  datafields: [
      { name: 'label', type: 'int' },
      { name: 'value', type: 'int' }
  ],
  localdata:[{label:'First Class',value:1},{label:'Second Class',value:2},{label:'Third Class',value:3}]}
  classAdapter: any = new jqx.dataAdapter(this.classSource, { autoBind: true });
  source: any =
  {
     
    datatype: 'json',
      datafields: [
          { name: 'passengerId', type: 'int' },
          { name: 'name', type: 'string' },
          { name: 'sex', type: 'string' ,value:'sex',values: { source: this.genderAdapter.records, value: 'value', name: 'label' } },
          { name: 'age', type: 'int' },
          { name: 'ticket', type: 'string' },
          { name: 'fare', type: 'float' },
          { name: 'cabin', type: 'string' },
          { name: 'pclass', type: 'int'},
          { name: 'pclassID', type: 'string',value:'pclass',values: { source: this.classSource.localdata, value: 'value', name: 'label' } },
          { name: 'sibSp', type: 'int'},
          { name: 'parch', type: 'int' },
          { name: 'embarked', type: 'string' }
      ],
      root: 'passengers',
      //record: 'passenger',
      id: 'passengerId',
      url: 'passenger/all'
  };

  getWidth() : any {
    return '90%';
  }

  dataAdapter: any = new jqx.dataAdapter(this.source);

  cellsrenderer = (row: number, columnfield: string, value: string | number, defaulthtml: string, columnproperties: any, rowdata: any): string => {
      if (value < 20) {
          return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
      }
      else {
          return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
      }
  };
  
  columns: any[] =
  [
      { text: 'Passenger Name', datafield: 'name',align:'center',width:250},
      { text: 'Gender', datafield: 'sex', columnType:'dropdownlist',
      createeditor:(row:number,value:any,editor:any):void => {
        editor.jqxDropDownList({width:'99%',source:this.genderAdapter,displayMember:'label',valueMember:'value'});
      }
      },
      { text: 'Age', datafield: 'age', align: 'right', cellsalign: 'right',
        columntype: 'numberinput',
        initeditor: function (row, cellvalue, editor) {
            editor.jqxNumberInput({ decimalDigits: 0 });
        }
      },
      { text: 'Ticket', datafield: 'ticket', cellsalign: 'right' },
      { text: 'Fare', datafield: 'fare', align: 'center' },
      { text: 'Cabin', datafield: 'cabin', align: 'center'},
      { text: 'Passenger class', datafield: 'pclass',displayField:'pclassID',
      columnType:'dropdownlist',
      createeditor:(row:number,value:any,editor:any):void => {
        editor.jqxDropDownList({width:'99%',source:this.classAdapter,displayMember:'label',valueMember:'value'});
      }},
      { text: 'pclassID', datafield: 'pclassID', hidden:true},
      { text: 'Siblings', datafield: 'sibSp', align: 'center' ,
          columntype: 'numberinput',
          initeditor: function (row, cellvalue, editor) {
              editor.jqxNumberInput({ decimalDigits: 0 });
          }
      },
      { text: 'Parch', datafield: 'parch', align: 'center',
          columntype: 'numberinput',
          initeditor: function (row, cellvalue, editor) {
              editor.jqxNumberInput({ decimalDigits: 0 });
          } 
      },
      { text: 'Embarked', datafield: 'embarked', align: 'center' }
];
rendertoolbar = (toolbar: any): void => {
  let container = document.createElement('div');
  container.style.margin = '5px';
  let buttonContainer1 = document.createElement('div');
  let buttonContainer3 = document.createElement('div');
  buttonContainer1.id = 'buttonContainer1';
  buttonContainer3.id = 'buttonContainer3';
  buttonContainer1.style.cssText = 'float: left';
  buttonContainer3.style.cssText = 'float: left; margin-left: 5px';
  container.appendChild(buttonContainer1);
  container.appendChild(buttonContainer3);
  toolbar[0].appendChild(container);
  let addRowButton = jqwidgets.createInstance('#buttonContainer1', 'jqxButton', { width: 105, value: 'Add New Row' });
  let deleteRowButton = jqwidgets.createInstance('#buttonContainer3', 'jqxButton', { width: 150, value: 'Delete Selected Row' });
  addRowButton.addEventHandler('click', () => {
      this.addRow();
  })
  deleteRowButton.addEventHandler('click', () => {
      this.deleteRow(this.myGrid.getselectedrowindex());
  })  
};
addRow():any {
  console.log('addRow');
    let row = {passengerId:0,pclass:0,name:"",sex:"",age:0,sibSp:0,parch:0,ticket:"",fare:0,cabin:"",embarked:""}
    this.addService(row);
    
}
updateRow(selectedrowindex) {
  let rowscount = this.myGrid.getdatainformation().rowscount;
  if (selectedrowindex >= 0 && selectedrowindex < parseFloat(rowscount)) {
      let rowData = this.myGrid.getrowdata(selectedrowindex);
      this.updateService(rowData,selectedrowindex)
  }
}
addService(titanic) {
  this.dataAdapter.records = this.myGrid.getrows();
  this.titanicService.updatePassangerInfo(titanic).subscribe(newPassenger => {
    this.myGrid.addrow(null, newPassenger);
    let rowscount = this.myGrid.getdatainformation().rowscount;
    this.myGrid.ensurerowvisible(parseInt(rowscount)-1);
    this.dataAdapter.records = this.myGrid.getrows();
  });
}
updateService(titanic,selectedrowindex) {
  this.titanicService.updatePassangerInfo(titanic).subscribe(newPassenger => {
    this.myGrid.addrow(selectedrowindex, newPassenger);
    this.myGrid.ensurerowvisible(selectedrowindex);
    this.dataAdapter.records = this.myGrid.getrows();
  });
}
deleteRow(selectedrowindex) {
  if(selectedrowindex > -1) {
    let row = this.myGrid.getrowdata(selectedrowindex);
    this.dataAdapter.records = this.myGrid.getrows();
    this.titanicService.deletePassangerInfo(row).subscribe(isDeleted => {
       if(isDeleted) {
        let id = this.myGrid.getrowid(selectedrowindex);
        this.myGrid.deleterow(id);
        this.dataAdapter.records = this.myGrid.getrows();
       }
    });

  }  
}
cellEndEditEvent(event){
  let row = this.myGrid.getrowdata(event.args.rowindex);
  let attribName = event.args.datafield;
  let record = this.getRecordFromSource(row.passengerId);
  if(event.args.oldValue != event.args.value) {
      if(attribName == 'sex') {
        record[attribName] = this.getkeyFromValue(this.genderSource.localdata,event.args.value);
      } else if(attribName == 'pclass') {
        record[attribName] =  event.args.value.value; //this.getkeyFromValue(this.classSource.localdata,event.args.value);
        record['pclassID'] = event.args.value.label;
      } else {
        record[attribName] = event.args.value;
      }   
      this.updateService(record,event.args.rowindex);
      
  } 
    
}
getRecordFromSource(passengerId):any {
  return this.dataAdapter.records.filter(x => x.passengerId== passengerId)[0];
}
getkeyFromValue(inputArray,value):any {
  return inputArray.filter(x => x.label == value)[0].value;
}
}
