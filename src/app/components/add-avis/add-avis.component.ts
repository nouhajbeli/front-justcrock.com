import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from './profile.model';

import { RecetteService } from './../../services/recette.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-avis',
  templateUrl: './add-avis.component.html',
  styleUrls: ['./add-avis.component.css']
})
export class AddAvisComponent implements OnInit {

  ajoutForm: any;
  files: any = [];
  categories: any = ['Entrée', 'Plat Principal', 'Patisseries Recettes'];
  submitted = false;
  userDetails:Profile;

  constructor(
    private myservice: RecetteService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService:UserService,
  ) {
    this.userDetails = new Profile();

  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((data:any)=>{
      console.log(data)
      this.userDetails=data.user
      this.ajoutForm = this.formBuilder.group({
        UserId: [this.userDetails.id],
        avis: ['', [Validators.required]],
        email: [this.userDetails.email],

      });
    })
  }


  get f() {
    return this.ajoutForm.controls;
  }

  addAvis() {
    this.submitted = true;

    // stop here if form is invalid



    this.myservice
      .addAvisService(
       this.ajoutForm.value).subscribe((data:any) => {
        this.router.navigate(['avis'])

      });
  }
}
