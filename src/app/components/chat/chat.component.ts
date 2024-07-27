import { Component, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { ChatService } from '../../services/chat/chat.service';
import { user } from '../../../types/user_interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  constructor(private _chat: ChatService, private _router: Router) { }
  resizeSubscription!: Subscription;
  isMediumScreen!: boolean
  chat_list!: boolean
  user_chat!: any
  user_email!: string
  selected_chat!: any
  selected_message!: any
  text_data: string = ''
  send_btn: boolean = false
  ngOnInit(): void {
    this.checkScreenSize();
    this.resizeSubscription = fromEvent(window, 'resize').subscribe(() => {
      this.checkScreenSize();
    });
    this._chat.chat_list().subscribe({
      next: (res: any) => {
        this.user_chat = res['data']
        this.user_email = res['email']
        console.log(this.user_chat);
        
      }
    })
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
  users() {
    this._router.navigate(['users'])
  }
  add_chat(data: any) {
    this.selected_chat = data
    this._chat.user_message(data['message_id']).subscribe({
      next: (res: any) => {
        this.selected_message = res
        console.log(this.selected_message);

      }
    })
  }
  check_text() {
    if (this.text_data.trim() == '') {
      this.send_btn = false
    } else {
      this.send_btn = true
    }
  }
  send(){
    this._chat.send_msg(this.text_data,this.selected_chat['message_id'],this.user_email)
    this.text_data=''
    this._chat.get_msg().subscribe({
      next:(res)=>{
       this.selected_message=res
       console.log(this.selected_message);
       
      }
    })
   
    
  }
}
