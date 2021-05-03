import { Component, OnInit } from '@angular/core';
import {UserService} from './../../services/user.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-p',
  templateUrl: './reset-p.component.html',
  styleUrls: ['./reset-p.component.css']
})
export class ResetPComponent implements OnInit {
  email:any;
  registerForm: any;
  submitted = false;
  serverErrorMessages:any;
  showSuccessMessage:any
    constructor(private myService: UserService,private formBuilder: FormBuilder,private router:Router,private toastr: ToastrService) { }

    ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
    });
    }

      get f() { return this.registerForm.controls; }

      onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.myService
        .resetService(this.registerForm.value)
        .subscribe( (res:any)  =>{
          console.log(res)
          this.showSuccessMessage="email envoyer verifier votre email"
          this.toastr.success("Email  Envoyer")

            },
        err =>{
          console.log(err)
          this.toastr.error(err.error.error)


        })
    }

  }
