import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RecetteService } from 'src/app/services/recette.service';
import { UserService } from 'src/app/services/user.service';
import { Profile } from './profile.model';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css']
})
export class AvisComponent implements OnInit {
avis:any
users:any
userDetails:Profile;
token:any =localStorage.getItem('token')
constructor(private myService: RecetteService,private userService:UserService,private sanitizer: DomSanitizer, private router: Router) {
  this.userDetails = new Profile();

}

  ngOnInit(): void {
this.myService.getAvisService().subscribe((data)=>{
  this.avis=data
  console.log(this.avis)
})
this.userService.getUserProfile().subscribe((data:any)=>{
  console.log(data)
  this.userDetails=data.user
})
this.userService.getAllService().subscribe((res:any)=>{
  this.users=res
  console.log('users',this.users)
})
  }
  deleteavis(id:any){
    this.userService.deleteAvisService(id).subscribe((data:any)=>{
      this.myService.getAvisService().subscribe((data)=>{
        this.avis=data
        console.log(this.avis)
      })
    })
  }
  editAvis(id:any){
    this.router.navigate(['editAvis',id])
  }

}
