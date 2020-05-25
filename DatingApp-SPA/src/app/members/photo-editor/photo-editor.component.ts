import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Photo } from "../../_Models/photo";
import { FileUploader } from "ng2-file-upload";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../_Services/auth.service";
import { THROW_IF_NOT_FOUND } from "@angular/core/src/di/injector";
import { UserService } from "../../_Services/user.service";
import { AlertifyService } from "../../_Services/alertify.service";

@Component({
  selector: "app-photo-editor",
  templateUrl: "./photo-editor.component.html",
  styleUrls: ["./photo-editor.component.css"],
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() changeMain = new EventEmitter<string>();

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMainPhoto: Photo;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + "users/" + this.auth.decodedToken.nameid + "/photos",
      authToken: "Bearer " + localStorage.getItem("token"),
      isHTML5: true,
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
        };
        this.photos.push(photo);
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.userService
      .setMainPhoto(this.auth.decodedToken.nameid, photo.id)
      .subscribe(
        () => {
          this.currentMainPhoto = this.photos.filter(
            (p) => p.isMain === true
          )[0];
          this.currentMainPhoto.isMain = false;
          photo.isMain = true;
          this.auth.changeMemberPhoto(photo.url);
          this.auth.currentUser.photoUrl = photo.url;
          localStorage.setItem("user", JSON.stringify(this.auth.currentUser));
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  deletePhoto(id: number) {
    this.alertify.confirm("Are sure you want to delete theis photo", () => {
      this.userService.deletePhoto(this.auth.decodedToken.nameid, id).subscribe(
        () => {
          this.photos.splice(
            this.photos.findIndex((p) => p.id === id),
            1
          );
          this.alertify.success("Photo deleted");
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    });
  }
}
