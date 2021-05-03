import { Component, OnInit } from '@angular/core';
import {UserService} from './../../services/user.service'
import {Router} from '@angular/router'
import { Profile } from './user-profile.model';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
 userDetails:Profile;
 modifie:boolean = false;
 image:any
 nom:any
 prenom:any
  constructor(private userService:UserService,private router:Router) {
    this.userDetails = new Profile();
   }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((data:any)=>{
      this.userDetails=data.user
     this.nom=this.userDetails.fullName.split(' ')[0]
     this.prenom=this.userDetails.fullName.split(' ')[1]
    })
  }
  onLogout(){
    this.userService.deleteToken()
    this.router.navigate(['/connect'])
  }
    onSelectimage(event: any) {
      this.image=event.target.files[0]

    }
    open(){
this.modifie=true
    }
    modifierimage(){
      this.userService.changeService(this.image,this.userDetails.id).subscribe((data)=>{
        location.reload();
      })


    }



}
