import { Component, OnInit } from '@angular/core';
import {UserService} from './../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  obj:any;
  contactForm:any;
  submitted:any;
  showSuccessMessage:any=false;
  serverErrorMessages:any
  constructor(private myService:UserService,private formBuilder: FormBuilder, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
     this.contactForm = this.formBuilder.group({
    nom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
});
}

// convenience getter for easy access to form fields
get f() { return this.contactForm.controls; }
onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.contactForm.invalid) {
      return;
  }

  this.myService
      .sendService(this.contactForm.value)
      .subscribe(

        (res:any)  =>{
          this.toastr.success("Email  Envoyer")

            },
        err =>{
          this.toastr.error("votre email n'est pas envoyer ")


        }
         );
  // display form values on success
}

}



