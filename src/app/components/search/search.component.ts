import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';

import { UnsplashService } from './../../services/unsplash.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  randomBg: string;
  photos: any;



  myForm = new FormGroup({
    searchTerm: new FormControl('', [
      Validators.required
    ]),
  });




  constructor(private unsplashService: UnsplashService) { }

  ngOnInit(): void {
    this.randomBg = "https://www.popsci.com/resizer/QgEMm6gNVXFYEFCmonq-Tp9_D7g=/760x506/cloudfront-us-east-1.images.arcpublishing.com/bonnier/3NIEQB3SFVCMNHH6MHZ42FO6PA.jpg"
  }


  searchImage() {
    console.log(this.myForm['value'].searchTerm);
    this.unsplashService.getPhotos(this.myForm['value'].searchTerm).subscribe(data => {
      this.photos = data['results']
      console.log(data);

    })


  }
}
