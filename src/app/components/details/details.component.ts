import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RecetteService } from './../../services/recette.service';
import { UserService } from './../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { Profile } from './profile.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  id: any;
  recette: any = {};
  recettes: any = [];
  comments: any = [];
  users: any = [];
  @Input() rating: any;
  @Input() itemId: any;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
  text: any;
  edit: boolean = false;
  userDetails: Profile;
  registerForm: any;
  submitted = false;
  inputName: any;
  starRating: any;
  rates: any = [];
  change1: boolean = false;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private activateroute: ActivatedRoute,
    private recetteService: RecetteService,
    private router: Router,
    private myService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.userDetails = new Profile();

  }

  ngOnInit(): void {
    this.titleService.setTitle('recette details');
    this.metaTagService.updateTag({
      name: 'keywords',
      content:
        'recttes recipe halal islam food ingredients mode-de-préparation',
    });
    this.id = this.activateroute.snapshot.params.id;
    this.myService.getUserProfile().subscribe((data: any) => {
      this.userDetails = data.user;
      console.log(this.userDetails);
    });
    this.recetteService.getrecetteById(this.id).subscribe((res) => {
      this.recette = res;
      console.log('recette', this.recette);
    });
    this.myService.getAllService().subscribe((res: any) => {
      this.users = res;
      console.log('users', this.users);
    });
    this.recetteService.getServiceComments(this.id).subscribe((res: any) => {
      this.comments = res;
      console.log('comments', this.comments);
    });
    this.recetteService.getRateService(this.id).subscribe((res: any) => {
      this.rates = res;
    });

    this.registerForm = this.formBuilder.group({
      Comment: [' ', [Validators.required]],
    });
  }
  deleteComment(id: any) {
    this.recetteService.deleteServiceComment(id).subscribe((res: any) => {
      console.log(res);
      this.getallcomments();
    });
  }
  change() {
    this.edit = !this.edit;
  }
  editComment(comment: any, id: any) {
    this.recetteService
      .editServiceComment(comment, id, this.id, this.userDetails.id)
      .subscribe((res: any) => {
        console.log(res);
        this.edit = !this.edit;

        this.getallcomments();
      });
  }
  getallcomments() {
    this.recetteService.getServiceComments(this.id).subscribe((res: any) => {
      this.comments = res;
      console.log('comments', this.comments);
    });
  }
  get f() {
    return this.registerForm.controls;
  }

  postComment() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.recetteService
      .addServiceComment(
        this.userDetails.id,
        this.registerForm.value.Comment,
        this.id
      )
      .subscribe((res) => {
        console.log(res);

        this.getallcomments();
        this.registerForm.value.Comment = 'Commenter';
      });
  }

  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating,
    });
    for (var i = 0; i < this.rates.length; i++) {
      if (this.userDetails.id === this.rates[i].UserId) {
        this.change1 = true;
        this.recetteService
          .editRateService(
            this.id,
            this.userDetails.id,
            this.rates[i].id,
            this.rating
          )
          .subscribe((data) => {
            console.log('rate updateed');
          });
      }
    }
    if (this.change1 === false) {
      this.recetteService
        .addRateService(this.id, this.userDetails.id, this.rating)
        .subscribe((data) => {
          console.log('rate addedd');
        });
    }
  }
}
