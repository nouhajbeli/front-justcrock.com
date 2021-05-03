import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from './profile.model';

import { RecetteService } from './../../services/recette.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-edit-avis',
  templateUrl: './edit-avis.component.html',
  styleUrls: ['./edit-avis.component.css']
})
export class EditAvisComponent implements OnInit {

  ajoutForm: any;
  files: any = [];
  categories: any = ['Entrée', 'Plat Principal', 'Patisseries Recettes'];
  submitted = false;
  userDetails:Profile;
id:any
  constructor(
    private myservice: RecetteService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService:UserService,
    private activateroute: ActivatedRoute,
  ) {
    this.userDetails = new Profile();

  }

  ngOnInit(): void {

    this.userService.getUserProfile().subscribe((data:any)=>{
      this.id = this.activateroute.snapshot.params.id;

      console.log(data)
      this.userDetails=data.user
      this.ajoutForm = this.formBuilder.group({
        UserId: [this.userDetails.id],
        avis: ['', [Validators.required]],
        email: [this.userDetails.email],
        id:[this.id]
      });
    })
  }


  get f() {
    return this.ajoutForm.controls;
  }

  editAvis() {
    this.submitted = true;

    // stop here if form is invalid



    this.myservice
      .editAvisService(
       this.ajoutForm.value).subscribe((data:any) => {
    this.router.navigate(['avis'])
      });
  }
}
