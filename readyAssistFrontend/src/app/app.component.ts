import { Component,OnInit,ViewChild } from '@angular/core';
import {AppService} from './app.service';
import { FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<AppElement>;
  title = 'readyAssistFrontend';
  userForm:FormGroup;
  searchForm:FormGroup;
  updateForm:FormGroup;
  constructor(private appService:AppService,private http:HttpClient){}
  displayedColumns=[
    "id",
    "first_name",
    "last_name",
    "delete"
  ]
  private dup;
  ngOnInit(){
    //console.log(1);
    this.display();
    this.userForm=new FormGroup({
      username:new FormControl(),
      first_name:new FormControl(),
      last_name:new FormControl()
    });
    this.searchForm = new FormGroup({
      id:new FormControl()
    });
    this.updateForm=new FormGroup({
      id:new FormControl(),
      first_name:new FormControl(),
      last_name:new FormControl()
    });
  }
  appObject:any={};
 

  onSearch(){
    var id=this.searchForm.value.id;
    console.log(id);
    if(id == ''){
      this.appService.getUser().subscribe(res=>
        {
          console.log(res);
          this.appObject=res;
         //this.dataSource=this.appObject;
          
          this.dataSource = new MatTableDataSource(this.appObject);
          this.dataSource.paginator = this.paginator;
          console.log(this.dataSource);
          console.error();
        });
    }else{
      this.appService.getUserId(id).subscribe(res=>
        {
          console.log(res);
          this.appObject=res;
         //this.dataSource=this.appObject;
          
          this.dataSource = new MatTableDataSource(this.appObject);
          this.dataSource.paginator = this.paginator;
          console.log(this.dataSource);
          console.error();
        });
    }
   
    
  }
 
  display(){
   
     this.appService.getUser().subscribe(res=>
    {
      console.log(res);
      this.appObject=res;
     //this.dataSource=this.appObject;
      
      this.dataSource = new MatTableDataSource(this.appObject);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
      console.error();
    });
    
   
  }

  onSubmit(){
    //console.log(1);
   var params = {
     username:this.userForm.value.username,
     first_name:this.userForm.value.first_name,
     last_name:this.userForm.value.last_name
   }
   this.appService.postUser(params).subscribe(res=>{
    console.log(res);
    if(res["code"]=='ER_DUP_ENTRY'){
      document.getElementById("dup").innerHTML = "Username is taken";
    }
  });;

  }

  deleteUser(id){
    console.log(id);
    this.appService.deleteUser(id).subscribe(res=>{
      console.log(res);
      this.ngOnInit();
    });
  }
  restoreUsers(){
    this.appService.restoreUsers().subscribe(res=>{
      console.log(res);
      this.ngOnInit();
    });
  }
  onUpdate(){
    let params={
      first_name:this.updateForm.value.first_name,
      last_name:this.updateForm.value.last_name
    }
    this.appService.updateUser(this.updateForm.value.id,params).subscribe(res=>{
      console.log(res);
      this.ngOnInit();
    });
  }
}

export interface AppElement{
  id:Number,
  first_name:String,
  last_name:String
}
