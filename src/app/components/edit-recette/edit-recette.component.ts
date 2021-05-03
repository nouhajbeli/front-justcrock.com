import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RecetteService } from './../../services/recette.service';

@Component({
  selector: 'app-edit-recette',
  templateUrl: './edit-recette.component.html',
  styleUrls: ['./edit-recette.component.css'],
})
export class EditRecetteComponent implements OnInit {
  files: any = [];
  loginForm: any;
  submitted = false;
  id: any;
  data: any;
  constructor(
    private myservice: RecetteService,
    private router: Router,
    private activateroute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.id = this.activateroute.snapshot.params.id;
  }
  createForm() {
    this.id = this.activateroute.snapshot.params.id;
    this.myservice.getrecetteById(this.id).subscribe((data: any) => {
      this.loginForm = this.formBuilder.group({
        description: [data.Description],
        ingredient: [data.Ingredient],
        preparation: [data.Preparation],
        temps_Preparation: [data.temps_Preparation],
        nombre_personne: [data.nombre_personne],
        temps_cuisson: [data.temps_cuisson],
        Photo: [data.Photo],
      });
    });
  }
  onSelectimage(event: any) {
    this.files.push(event.target.files[0]);
  }
  editrecette() {
    this.submitted = true;

    // stop here if form is invalid
    this.id = this.activateroute.snapshot.params.id;
    this.myservice.getrecetteById(this.id).subscribe((data: any) => {console.log(data)});
    console.log(this.data)
  if(! this.files[0]){
    this.loginForm.Photo = this.loginForm.value.Photo;

  }else {
    this.loginForm.Photo = this.files[0];

  }

    this.myservice
      .editService(
        this.loginForm.value.description,
        this.loginForm.value.ingredient,
        this.loginForm.value.preparation,
        this.loginForm.value.temps_Preparation,
        this.loginForm.value.nombre_personne,
        this.loginForm.value.temps_cuisson,
        this.loginForm.Photo,
        this.id
      )
      .subscribe((data) => {
        this.router.navigate(['/recette'])
      });
  }
}
