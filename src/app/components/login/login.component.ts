import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserService} from './../../services/user.service'
import {Router} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private myService:UserService,private router:Router,private formBuilder: FormBuilder,private toastr: ToastrService) { }
  model={
    email:'',
    password:''
  }
  serverErrorMessages:any;
registerForm: any;
submitted = false;
  ngOnInit(): void {
    if(this.myService.isLoggedIn()){
      this.router.navigateByUrl('/userProfile')
    }
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
  });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    // display form values on success
    this.myService.login(this.registerForm.value).subscribe(
      (res:any)  =>{

    console.log(res)
        if(res['status']==='blocked'){
          this.toastr.error("votre compte a éte blocker ")


        }else {
          this.myService.setToken(res['token'])
         this.router.navigate(['userProfile',  { id: this.myService.getUserPayload().id}])
        }

              },
              err =>{
                this.toastr.error(err.error.message)


              }
    )
  }

}
