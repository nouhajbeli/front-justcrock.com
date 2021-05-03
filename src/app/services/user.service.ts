import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http: HttpClient;
  urlApi = 'http://localhost:3000/api';
noAuthHeader={headers:new HttpHeaders({'NoAuth':'True'})}
  constructor(private httpClient: HttpClient) {
    this.http = httpClient;

  }
  login(authCredentials:any){
    return this.http.post(this.urlApi+'/user/authenticate',authCredentials,this.noAuthHeader)
  }
  setToken(token:any){
    localStorage.setItem('token',token)
  }
  deleteToken(){
    localStorage.removeItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }
  getUserPayload(){
    var token=this.getToken()
    if(token){
      var userPayload=atob(token.split('.')[1]);
      return JSON.parse(userPayload)
    }else {
      return null
    }
  }
  getUserProfile(){
    return this.http.get(this.urlApi+'/user/userProfile')
  }

  isLoggedIn(){
    var userPayload=this.getUserPayload()
    if(userPayload){
      return userPayload.exp > Date.now() /1000
    }else {
      return false
    }
  }
  resetService(body:any){
    return this.http.post(this.urlApi+'/user/reset-password',body)

  }
  NewService(body:any,token:any){
    return this.http.post(this.urlApi+'/user/newpassword/'+token,body)

  }
  getIdService(id:any){
    return this.http.get(this.urlApi+'/user/userProfileId/'+id)

  }
  getAllService(){
    return this.http.get(this.urlApi+'/user/getUsers')

  }
  sendService(body:any){
    return this.http.post(this.urlApi+'/contact/sendEmail',body)

  }
  changeService(image:any,id:any){
    const body = new FormData();
    body.append('id', id);
    body.append('file', image);
    return this.http.put(this.urlApi+'/user/editimage', body);

  }
  deleteAvisService(id:any){
    return this.http.delete(this.urlApi+'/avis/'+id);

  }

}
