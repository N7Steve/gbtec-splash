import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UnsplashService {

  accessKey = "OiZSz3VnFAlat6Moq1hGYaVudGJS0x_8FBUW-VbJcZs"
  secretKey = "EG3tfStGAji0UurzxnDQl4UFB2NzLmbZ6lfiiYX5c_w"
  myPhotos = []


  constructor(private http: HttpClient) {
    if (localStorage.getItem("myPhotos")) {
      this.myPhotos = JSON.parse(localStorage.getItem("myPhotos"))
    }
    console.log(this.myPhotos);
    
  }

  getPhotos(searchTerm: string) {
    return this.http.get('https://api.unsplash.com/search/photos/?client_id=' + this.accessKey + '&query=' + searchTerm)
  }

  getRandomPhoto(count) {
    return this.http.get('https://api.unsplash.com/photos/random/?client_id=' + this.accessKey + "&count=" + count)
  }

  savePhoto(newPhoto) {
    this.myPhotos.push(newPhoto)
    localStorage.setItem("myPhotos", JSON.stringify(this.myPhotos))
  }
}