import { Component, Input, OnInit } from "@angular/core";
import { AlertifyService } from "src/app/_Services/alertify.service";
import { AuthService } from "src/app/_Services/auth.service";
import { UserService } from "src/app/_Services/user.service";
import { Message } from "../../_Models/message";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-members-messages",
  templateUrl: "./members-messages.component.html",
  styleUrls: ["./members-messages.component.css"],
})
export class MembersMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService
      .getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .pipe(
        tap((messages) => {
          for (let i = 0; i < messages.length; i++) {
            if (
              messages[i].isRead === false &&
              messages[i].recipientId === currentUserId
            ) {
              this.userService.markAsRead(currentUserId, messages[i].id);
            }
          }
        })
      )
      .subscribe(
        (messages) => {
          this.messages = messages;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService
      .sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe(
        (message: Message) => {
          this.messages.unshift(message);
          this.newMessage.content = "";
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
