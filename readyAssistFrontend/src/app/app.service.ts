import { Injectable } from '@angular/core';
import {HttpHeaders,HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Observable, Operator } from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  postUser(params){
   return this.http.post('http://localhost:8000/post',params);
  }
  getUser(){
    return this.http.get('http://localhost:8000/get/all');
    
  }
  getUserId(id){
    return this.http.get(`http://localhost:8000/get/${id}`);
  }
  updateUser(id,params){
    return this.http.patch(`http://localhost:8000/update/${id}`,params);
  }
  deleteUser(id){
    return this.http.delete(`http://localhost:8000/delete/${id}`);
  }
  restoreUsers(){
    return this.http.patch(`http://localhost:8000/restore`,null);
  }
}
