import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_Models/user';
import { UserService } from '../../_Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_Services/alertify.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
@ViewChild('memberTabs') memberTabs: TabsetComponent;

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

    this.route.queryParams.subscribe(params => {
      const selectedTabs = params['tab'];
      this.memberTabs.tabs[selectedTabs > 0 ? selectedTabs : 0].active = true;
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

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

}
