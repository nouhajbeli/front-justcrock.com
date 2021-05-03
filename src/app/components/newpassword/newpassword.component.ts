import { Component, OnInit } from '@angular/core';
import {UserService} from './../../services/user.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

  email:any;
  registerForm: any;
  submitted = false;
  token:any
  serverErrorMessages:any;
  showSuccessMessage:any;
    constructor(private myService: UserService,private formBuilder: FormBuilder,private router:Router,private activateroute: ActivatedRoute,private toastr: ToastrService) { }

    ngOnInit(): void {
      this.token = this.activateroute.snapshot.params.token;

      this.registerForm = this.formBuilder.group({
        password: ['', [Validators.required]],
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
        .NewService(this.registerForm.value,this.token)
        .subscribe(
          (res:any)  =>{
            console.log(res)

          this.router.navigateByUrl('/connect')

          },
          err =>{
            console.log(err)
            this.toastr.error(err.error.error)


          }



        )
    }

  }
