import { Message } from './message';
import { SocketIoService } from './socket-io.service';
import { Component, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nickname: string;
  message: string;
  messages: Message[] = [];

  private subscriptionMessages : Subscription;
  private subscriptionList: Subscription;

  @ViewChild(MatList, {read: ElementRef, static : true}) list : ElementRef;
  @ViewChildren(MatListItem) listItems : QueryList<MatListItem>;

  constructor(private socketService: SocketIoService) {
  }

  ngOnInit(): void {
    this.subscriptionMessages = this.socketService.messages()
      .subscribe((m : Message) => {
        console.log("Messagem recebida: ", m);
        this.messages.push(m)
      });
  }

  send() {
    this.socketService.send({
      from: this.nickname,
      message: this.message
    });
    this.clearFields();
  }

  clearFields() {
    this.nickname = "";
    this.message = "";
  }

  ngAfterViewInit(): void {
    this.subscriptionList = this.listItems.changes.subscribe((e) =>{
      this.list.nativeElement.scrollTop = this.list.nativeElement.scrollHeight;
    });  
  }

  ngOnDestroy(): void {
    this.subscriptionMessages.unsubscribe();
    this.subscriptionList.unsubscribe();
  }
}
