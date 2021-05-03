import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, HostListener } from '@angular/core';

import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel'; // -------- important
import {RecetteService} from './../../services/recette.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {UserService} from './../../services/user.service'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
  export class CardsComponent implements OnInit {
    CAROUSEL_BREAKPOINT = 768;
    carouselDisplayMode = 'multiple';
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
    cards = [
      {
        title: 'Card Title 1',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content',
        buttonText: 'Button',
        img: 'https://www.atelierdeschefs.com/media/recette-e23473-pommes-de-terre-facon-arrabbiata-et-gambas-au-basilic.jpg'
      },
      {
        title: 'Card Title 2',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content',
        buttonText: 'Button',
        img: 'https://ileauxepices.com/blog/wp-content/uploads/2018/04/chakchouka-tunisienne.jpg'
      },
      {
        title: 'Card Title 3',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content',
        buttonText: 'Button',
        img: 'https://m1.quebecormedia.com/emp/emp/pou725462dd-babc-44cd-88cd-42981febdf47_ORIGINAL.jpg?impolicy=crop-resize&x=0&y=0&w=2392&h=1300&width=925&height=925'
      },
      {
        title: 'Card Title 4',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content',
        buttonText: 'Button',
        img: 'https://assets.afcdn.com/recipe/20180413/78569_w1024h1024c1cx2400cy1600.webp'
      },
      {
        title: 'Card Title 5',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content',
        buttonText: 'Button',
        img: 'https://img.cuisineaz.com/680x357/2018-07-30/i141364-sandwich-mexicain.jpeg'
      },
      {
        title: 'Card Title 6',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content',
        buttonText: 'Button',
        img: 'https://img-3.journaldesfemmes.fr/-c652y6rrAC20vomvua04KanF5Y=/748x499/smart/861a0695a67546928a4a777e57acd621/recipe-jdf/376599.jpg'
      },
      {
        title: 'Card Title 7',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content',
        buttonText: 'Button',
        img: 'https://az826390.vo.msecnd.net/cdn/media/home/inspiring_recipes/recipes/new_-_c/curieux-macaroni-viande-1160x650-bs009912-pub-71487/pub88678-recettes-curieux-macaroni-a-la-viande-bs009912-1160x650.ashx'
      },
      {
        title: 'Card Title 8',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content',
        buttonText: 'Button',
        img: 'https://sf2.viepratique.fr/wp-content/uploads/sites/2/2021/04/gettyimages-501094584-750x410.jpg'
      },
      {
        title: 'Card Title 9',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content',
        buttonText: 'Button',
        img: 'https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2FFAC.2Fvar.2Ffemmeactuelle.2Fstorage.2Fimages.2Fcuisine.2Frecettes-de-cuisine.2Frecettes-ete-bonnes-idees-pour-le-diner-41998.2F14644269-1-fre-FR.2Frecettes-d-ete-bonnes-idees-pour-le-diner.2Ejpg/850x478/quality/90/crop-from/center/recettes-d-ete-bonnes-idees-pour-le-diner.jpeg'
      },
    ];
    slides: any = [[]];
    chunk(arr:any, chunkSize:any) {
      let R = [];
      for (let i = 0, len = arr.length; i < len; i += chunkSize) {
        R.push(arr.slice(i, i + chunkSize));
      }
      return R;
    }
    ngOnInit() {

      this.myService.getService().subscribe((data:any) => {
        this.myArray = data;

        this.recettes = this.myArray
    .sort(function (a: any, b: any) {

        return b- a;
      }
    );
      })

      this.slides = this.chunk(this.cards, 3);

      if (window.innerWidth <= this.CAROUSEL_BREAKPOINT) {
        this.carouselDisplayMode = 'single';
      } else {
        this.carouselDisplayMode = 'multiple';
      }
    }

    @HostListener('window:resize')
    onWindowResize() {
      if (window.innerWidth <= this.CAROUSEL_BREAKPOINT) {
        this.carouselDisplayMode = 'single';
      } else {
        this.carouselDisplayMode = 'multiple';
      }
    }
    getRecette(){


    }


    getrecette(id:any){
      this.router.navigate(['details',  id])
    }

  }
