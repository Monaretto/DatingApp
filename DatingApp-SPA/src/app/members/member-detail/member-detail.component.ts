import { Component, OnInit } from '@angular/core';
import { User } from '../../_Models/user';
import { UserService } from '../../_Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_Services/alertify.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService,
     private route: ActivatedRoute,
     private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  getImages() {
    const imagesUrls =[];
    for (const photo of this.user.photos) {
      imagesUrls.push(
        {
          small: photo.url,
          medium:  photo.url,
          big: photo.url,
          description: photo.description
        });
    }
    return imagesUrls;
  }

}
