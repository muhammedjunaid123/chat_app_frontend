import { Component, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { ChatService } from '../../services/chat/chat.service';
import { user } from '../../../types/user_interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  constructor(private _chat: ChatService) { }
  resizeSubscription!: Subscription;
  isMediumScreen!: boolean
  chat_list!: boolean
  user_list!: user[]
  ngOnInit(): void {
    this.checkScreenSize();
    this.resizeSubscription = fromEvent(window, 'resize').subscribe(() => {
      this.checkScreenSize();
    });
  
  }

  private checkScreenSize(): void {
    if (window.innerWidth < 768) {
      this.chat_list = true
      this.isMediumScreen = false
    } else {
      this.isMediumScreen = true
    }
  }
  in_chat() {
    if (this.chat_list) {

      this.chat_list = false
    } else {
      this.chat_list = true
    }
  }
}
