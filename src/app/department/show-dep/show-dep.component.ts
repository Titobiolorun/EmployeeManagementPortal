import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedService) { }

  DepartmentList:any=[];

  ModalTitle!:string;
  ActivatedAddEditDepComp:boolean=false;
  dep:any;

  DepartmentIdFilter:string="";
  DepartmentNameFilter:string="";
  DepartmentListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick(){
    this.dep={
      DepartmentId:0,
      DepartmentName:""
    }
    this.ModalTitle="Add Department";
    this.ActivatedAddEditDepComp=true;
  }

  editClick(item:any){
    this.dep=item;
    this.ModalTitle="Edit Department";
    this.ActivatedAddEditDepComp=true;
  }

  deleteClick(item:any){
    if(confirm('Are you sure?')){
      this.service.deleteDepartment(item).subscribe(data=>{
        console.log("data", data);
        alert(data.toString());
        this.refreshDepList();
      })
    }
  }

  closeClick(){
    this.ActivatedAddEditDepComp=false;
    this.refreshDepList();
  }

  refreshDepList(){
    this.service.getDepList().subscribe(data => {
      this.DepartmentList = data;
    });
  }

  FilterFn(){
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (el:any){
      return el.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      )&&
      el.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      )
      });
  }

  sortResult(prop:any, asc:any){
    this.DepartmentList =this.DepartmentListWithoutFilter.sort(function  (a:any, b:any){
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 : 0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 : 0);
      }
    })
  }
}
