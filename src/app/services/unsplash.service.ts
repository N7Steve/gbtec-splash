import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UnsplashService {

  accessKey = "OiZSz3VnFAlat6Moq1hGYaVudGJS0x_8FBUW-VbJcZs"
  secretKey = "EG3tfStGAji0UurzxnDQl4UFB2NzLmbZ6lfiiYX5cw"

  myPhotos: Array<any>;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("myPhotos")) {
      this.myPhotos = JSON.parse(localStorage.getItem("myPhotos"))
    }
  }

  getPhotos(searchTerm: string, page: number) {
    return this.http.get('https://api.unsplash.com/search/photos/?client_id=' + this.accessKey + '&query=' + searchTerm + '&page=' + page)
  }

  getRandomPhoto(count: number) {
    return this.http.get('https://api.unsplash.com/photos/random/?client_id=' + this.accessKey + "&count=" + count)
  }

  savePhoto(newPhoto: object) {
    this.myPhotos.push(newPhoto)
    localStorage.setItem("myPhotos", JSON.stringify(this.myPhotos))
  }

  deletePhoto(photo: string) {
    this.myPhotos.splice(this.myPhotos.findIndex(e => e.srcRegular === photo), 1)
    localStorage.setItem("myPhotos", JSON.stringify(this.myPhotos))
  }
}