import { UnsplashService } from './../../services/unsplash.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-my-photos',
  templateUrl: './my-photos.component.html',
  styleUrls: ['./my-photos.component.scss']
})
export class MyPhotosComponent implements OnInit {

  myPhotos = []
  constructor(private unsplashService: UnsplashService) {
    this.myPhotos = this.unsplashService.myPhotos
   }

  ngOnInit(): void {
  }
  
  imgLoad(èvent){
    var target = èvent.currentTarget
    
    $(target).removeClass("loading")
    $(target).siblings(".loader").addClass("d-none")
  }
}
