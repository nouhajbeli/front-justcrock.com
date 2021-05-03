import { Component, OnInit } from '@angular/core';
import {RecetteService} from './../../services/recette.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {UserService} from './../../services/user.service'
import { Profile } from './user-profile.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { Title, Meta } from '@angular/platform-browser';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';



@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.css']
})
@Injectable()
export class RecettesComponent implements OnInit {
  myArray: any = [];
  file: any;
  categorie:any
  serverErrorMessages:any;
  userDetails:Profile;
  rates:any;
   recettes:any=[];
   p:any;
  constructor(config: NgbModalConfig, private modalService: NgbModal ,private titleService: Title,
    private metaTagService: Meta,private myService: RecetteService,private userService:UserService,private sanitizer: DomSanitizer, private router: Router
    ) {

      config.backdrop = 'static';
      config.keyboard = false;
      this.userDetails = new Profile();

    }

  ngOnInit(): void {
    this.titleService.setTitle('toutes les recettes');
    this.metaTagService.updateTag({
      name:'description', content:'des recettes halal - food halal '
    });
    this.metaTagService.updateTag({
      name:'keywords', content:'recttes recipe halal islam food pates salades gateaux salés sucrés'
    })
    this.myService.getServiceRates().subscribe((res:any)=>{
      this.rates=res
    })
    this.getRecette()

   this.userService.getUserProfile().subscribe((data:any)=>{
    this.userDetails=data.user
  })


  }
  open(content:any) {
    this.modalService.open(content);
  }

  deleteRecette(id: string) {
    console.log(id);

    this.myService
      .deleteService(id)
      .subscribe((data) => {
        console.log(data)
        this.getRecette();
        location.reload();
        // this.router.navigate(['recette'])
       })
  }
  getRecette(){

    this.myService.getService().subscribe((data:any) => {
      this.myArray = data;
    })

  }


  getrecette(id:any){
    this.router.navigate(['details',  { id: id }]).then(() => {
      location.reload();
    });
  }

}
