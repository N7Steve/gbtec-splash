import { UnsplashService } from './../../services/unsplash.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-my-photos',
  templateUrl: './my-photos.component.html',
  styleUrls: ['./my-photos.component.scss']
})
export class MyPhotosComponent implements OnInit {

  myPhotos: Array<any>;
  randomBg: string;

  constructor(private unsplashService: UnsplashService) {
    this.myPhotos = this.unsplashService.myPhotos;
  }

  ngOnInit(): void {
    this.unsplashService.getRandomPhoto(1).subscribe(data => {
      this.randomBg = data[0].urls.regular;
    },
      err => {
        console.warn(err);
        this.randomBg = "/assets/img/default-image-2.jpg";
      }
    )
  }

  deletePhoto(i: number) {
    let photo = this.myPhotos[i].srcRegular;
    this.unsplashService.deletePhoto(photo);
  }
}
