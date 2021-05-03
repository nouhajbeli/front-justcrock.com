import { Component, OnInit } from '@angular/core';
import {RecetteService} from './../../services/recette.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {UserService} from './../../services/user.service'
@Component({
  selector: 'app-toprecette',
  templateUrl: './toprecette.component.html',
  styleUrls: ['./toprecette.component.css']
})
export class ToprecetteComponent implements OnInit {

  myArray: any = [];
  file: any;
  categorie:any
  serverErrorMessages:any;
  rates:any;
   recettes:any=[]
  constructor(private myService: RecetteService,private userService:UserService,private sanitizer: DomSanitizer, private router: Router
    ) {
      this.myService.getServiceRates().subscribe((res:any)=>{
        this.rates=res
      })

    }

  ngOnInit(): void {
    this.myService.getService().subscribe((data:any) => {
      this.myArray = data;

    this.recettes = this.myArray.map((recette: any) => {
      var sum = 0;
       var nbr=0

  this.rates.map((rate: any) => {
    if(rate.Id_recette == recette.Id_recette){
      sum = sum +Number( rate.rates)
      nbr=nbr+1

    }

  })

  recette['averagerate'] = (sum /nbr).toFixed(1);
  return recette;
})
.sort(function (a: any, b: any) {
  if (a.averagerate === 'NaN') {
    return 1;
  } else if (b.averagerate === 'NaN') {
    return -1;
  } else {
    return b.averagerate - a.averagerate;
  }
});
  //  this.getRecette()
  console.log('recettes',this.recettes)
})

  }


  getRecette(){

    // })

  }


  getrecette(id:any){
    this.router.navigate(['details',  { id: id }]).then(() => {
      location.reload();
    });
  }

}
