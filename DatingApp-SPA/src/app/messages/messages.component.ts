import { Component, OnInit } from '@angular/core';
import { Message } from '../_Models/message';
import { Pagination, PaginatedResult } from '../_Models/pagination';
import { UserService } from '../_Services/user.service';
import { AlertifyService } from '../_Services/alertify.service';
import { AuthService } from '../_Services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor( private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid,
       this.pagination.currentPage,
        this.pagination.itemsPerPage,
      this.messageContainer).subscribe((res: PaginatedResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      }, error=> {
        this.alertify.error(error);
      });
  }

  deleteMessage(id: number) {
    this.alertify.confirm('are you sure you want to delete this message?', ()=>{
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('Message deleted');
      }, error => {
        this.alertify.error(error);
      });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
