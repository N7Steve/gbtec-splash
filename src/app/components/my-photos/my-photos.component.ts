import { UnsplashService } from './../../services/unsplash.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-my-photos',
  templateUrl: './my-photos.component.html',
  styleUrls: ['./my-photos.component.scss']
})
export class MyPhotosComponent implements OnInit {

  myPhotos = []
  randomBg: string

  constructor(private unsplashService: UnsplashService) {
    this.myPhotos = this.unsplashService.myPhotos
  }

  ngOnInit(): void {
    this.unsplashService.getRandomPhoto(1).subscribe(data => {
      this.randomBg = data[0].urls.regular
    })
  }

  deletePhoto(i: number) {
    let photo = this.myPhotos[i].srcRegular
    this.unsplashService.deletePhoto(photo)
  }
}
