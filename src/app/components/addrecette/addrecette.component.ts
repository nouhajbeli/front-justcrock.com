import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RecetteService } from './../../services/recette.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addrecette',
  templateUrl: './addrecette.component.html',
  styleUrls: ['./addrecette.component.css'],
})
export class AddrecetteComponent implements OnInit {
  loginForm: any;
  files: any = [];
  categories: any = ['Entrée', 'Plat Principal', 'Patisseries Recettes'];
  submitted = false;

  constructor(
    private myservice: RecetteService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      ingredient: ['', [Validators.required]],
      preparation: ['', [Validators.required]],
      temps_Preparation:['', [Validators.required]],
      nombre_personne:['', [Validators.required]],
      temps_cuisson:['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
  onSelectimage(event: any) {
    this.files.push(event.target.files[0]);
  }

  get f() {
    return this.loginForm.controls;
  }

  addrecette() {
    this.submitted = true;

    // stop here if form is invalid

    this.loginForm.image = this.files[0];
    console.log(this.loginForm.image)

    this.myservice
      .addService(
        this.loginForm.value.description,
        this.loginForm.value.ingredient,
        this.loginForm.value.preparation,
        this.loginForm.value.temps_Preparation,
        this.loginForm.value.temps_cuisson,
        this.loginForm.value.nombre_personne,
        this.loginForm.image,
      )
      .subscribe((data) => {
        console.log(this.loginForm.image)
        console.log('recette added', data);
                this.router.navigate(['recette'])


      });
  }
}
