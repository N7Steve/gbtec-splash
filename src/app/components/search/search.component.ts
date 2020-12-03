import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private unsplashService: UnsplashService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.randomBg = "https://www.popsci.com/resizer/QgEMm6gNVXFYEFCmonq-Tp9_D7g=/760x506/cloudfront-us-east-1.images.arcpublishing.com/bonnier/3NIEQB3SFVCMNHH6MHZ42FO6PA.jpg"
    
    this.unsplashService.getRandomPhoto(1).subscribe(data => {
      this.randomBg = data[0].urls.regular
    })
    
    this.unsplashService.getRandomPhoto(10).subscribe(data => {
      this.photos = data
    })
  }

  searchImage() {
    this.unsplashService.getPhotos(this.myForm['value'].searchTerm).subscribe(data => {
      this.photos = data['results']
      console.log(this.photos);

    })
  }

  imgLoad(event) {
    var target = event.currentTarget

    $(target).removeClass("loading")
    $(target).siblings(".loader").addClass("d-none")
  }


  savePhoto(event, i: number) {

    var target = event.currentTarget
    console.log($(target).children(".mat-icon").text());

    $(target).find(".mat-icon").text("favorite")
    const newPhoto = {
      srcRegular: this.photos[i].urls.regular,
      srcFull: this.photos[i].urls.regular
    }

    if (this.unsplashService.myPhotos.find(e => e.srcRegular == newPhoto.srcRegular)) {
      this.openSnackBar("¡Esta imagen ya la has guardado!")
    } else {
      this.unsplashService.savePhoto(newPhoto)
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 4500
    });
  }

  isSaved(i: number) {
    if (this.unsplashService.myPhotos.find(e => e.srcRegular == this.photos[i].urls.regular)) {
      return true
    } else {
      return false
    }
  }
}
