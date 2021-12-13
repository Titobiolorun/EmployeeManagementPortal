import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }

  EmployeeList:any=[];

  ModalTitle!:string;
  ActivatedAddEditEmpComp:boolean=false;
  emp:any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick(){
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining!:"",
      PhotofilleName:"titobi.png",

    }
    this.ModalTitle="Add Employee";
    this.ActivatedAddEditEmpComp=true;
  }

  editClick(item:any){
    this.emp=item;
    this.ModalTitle="Edit Employee";
    this.ActivatedAddEditEmpComp=true;
  }

  deleteClick(item:any){
    if(confirm('Are you sure?')){
      this.service.deleteEmployee(item).subscribe(data=>{
        console.log("data", data);
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }

  closeClick(){
    this.ActivatedAddEditEmpComp=false;
    this.refreshEmpList();
  }

  refreshEmpList(){
    this.service.getEmpList().subscribe(data =>{
      this.EmployeeList=data;
    });
  }

}
