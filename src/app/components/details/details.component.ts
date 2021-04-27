import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {RecetteService} from './../../services/recette.service';
import {UserService} from './../../services/user.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
id:any
recette:any= {}
recettes: any = [];
comments: any = [];
users:any=[]
text:any
edit: boolean = false;
userDetails:any;
registerForm: any;
submitted = false;

constructor( private activateroute: ActivatedRoute,
    private recetteService: RecetteService,
    private router: Router,private myService:UserService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.activateroute.snapshot.params.id;
    this.recetteService.getrecetteById(this.id).subscribe((res) => {
      this.recette = res;
      console.log('recette', this.recette);

    });
    this.myService.getAllService().subscribe((res:any)=>{
      this.users=res
      console.log('users',this.users)
    })
    this.recetteService.getServiceComments(this.id).subscribe((res:any)=>{
      this.comments=res
      console.log('comments',this.comments)
    })
    this.myService.getUserProfile().subscribe((data:any)=>{
      this.userDetails=data.user
      console.log(this.userDetails.role)
    })
    this.registerForm = this.formBuilder.group({
      Comment: [' ', [Validators.required]],
  });
  }
  deleteComment(id:any){
    this.recetteService.deleteServiceComment(id).subscribe((res:any)=>{
      console.log(res)
      this.getallcomments()

    })
  }
  change(){
    this.edit = !this.edit;

  }
  editComment(comment:any,id:any){
    this.recetteService.editServiceComment(comment,id,this.id,this.userDetails.id).subscribe((res:any)=>{
      console.log(res)
      this.edit = !this.edit;

      this.getallcomments()

    })

  }
  getallcomments(){
    this.recetteService.getServiceComments(this.id).subscribe((res:any)=>{
      this.comments=res
      console.log('comments',this.comments)
    })
  }
  get f() { return this.registerForm.controls; }

  postComment(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.recetteService.addServiceComment(this.userDetails.id,this.registerForm.value.Comment,this.id).subscribe((res)=>{
      console.log(res)

      this.getallcomments()
      this.registerForm.value.Comment="Commenter"
    })
  }





}
