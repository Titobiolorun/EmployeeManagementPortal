import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  @Input() emp:any;
  EmployeeId:string="";
  EmployeeName:string="";
  Department:string="";
  DateOfJoining:string="";
  PhotofilleName:string="";
  PhotofillePath:string="";

  DepartmentsList:any=[];

  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.loadDepartmentsList;
  }

  loadDepartmentsList(){
    this.service.getAllDepartmentNames().subscribe((data:any) =>{
      this.DepartmentsList=data;

      this.EmployeeId=this.emp.EmployeeId;
      this.EmployeeName=this.emp.EmployeeName;
      this.Department=this.emp.Department;
      this.DateOfJoining=this.emp.DateOfJoining;
      this.PhotofilleName=this.emp.PhotofilleName;
      this.PhotofillePath=this.service.PhotoUrl+this.PhotofilleName;
    })
  }

  addEmployee(){
    var val = {EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName, 
      Department:this.Department, 
      DateOfJoining:this.DateOfJoining,
      PhotofilleName:this.PhotofilleName};
    this.service.addEmployee(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateEmployee(){
    var val = {EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName, 
      Department:this.Department, 
      DateOfJoining:this.DateOfJoining,
      PhotofilleName:this.PhotofilleName};
    this.service.updateEmployee(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  uploadPhoto(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('UploadedFile', file, file.name);
    
    this.service.uploadPhoto(formData).subscribe((data:any) => {
      this.PhotofilleName=data.toString();
      this.PhotofillePath=this.service.PhotoUrl+this.PhotofilleName;
  });
  }

}
