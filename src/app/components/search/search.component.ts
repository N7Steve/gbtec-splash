import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UnsplashService } from './../../services/unsplash.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  photos: any;

  noResults: boolean = false;
  loaded: boolean = false;

  randomBg: string;
  errorText: string;
  searchTerm: string;

  actualPage: number;

  myForm = new FormGroup({
    searchTerm: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(private unsplashService: UnsplashService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.unsplashService.getRandomPhoto(1).subscribe(data => {
      this.randomBg = data[0].urls.regular;
    },
      err => {
        console.warn(err);
        this.randomBg = "/assets/img/default-image.jpg";
      }
    )

    this.unsplashService.getRandomPhoto(10).subscribe(data => {
      this.photos = data;
    },
      err => {
        console.warn(err)
        this.noResults = true;
        this.errorText = "Ha habido un error en la petición";
      }
    )
  }

  searchImage() {
    this.searchTerm = this.myForm['value'].searchTerm;
    this.actualPage = 1;

    this.unsplashService.getPhotos(this.searchTerm, this.actualPage).subscribe(data => {
      this.photos = data['results'];

      this.loaded = true;

      if (data['results'].length == 0) {
        this.noResults = true;
        this.errorText = "No se han encontrado resultados";
      } else {
        this.noResults = false;
      }
    },
      err => {
        console.warn(err);
        this.noResults = true;
      })
  }

  imgLoad(event: Event) {
    var target = event.currentTarget;

    $(target).removeClass("loading");
    $(target).siblings(".loader").addClass("d-none");
  }


  savePhoto(event: Event, i: number) {

    var target = event.currentTarget;


    const newPhoto = {
      srcRegular: this.photos[i].urls.regular,
      srcFull: this.photos[i].urls.full
    }

    if (this.unsplashService.myPhotos.find(e => e.srcRegular == newPhoto.srcRegular)) {
      this.openSnackBar("¡Esta imagen ya la has guardado!");
    } else {
      this.unsplashService.savePhoto(newPhoto)
      $(target).find(".mat-icon").text("favorite");
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 4500
    });
  }

  isSaved(i: number) {
    if (this.unsplashService.myPhotos.find(e => e.srcRegular == this.photos[i].urls.regular)) {
      return true;
    } else {
      return false;
    }
  }

  loadMore() {
    this.actualPage++;

    $(".infinite-scroll-loader").removeClass("d-none");

    this.unsplashService.getPhotos(this.searchTerm, this.actualPage).subscribe(data => {
      this.photos = this.photos.concat(data['results']);
      $(".infinite-scroll-loader").addClass("d-none");
    },
      err => {
        console.warn(err);
        this.noResults = true;
      })
  }
}
