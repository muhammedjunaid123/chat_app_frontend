import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { user } from '../../../types/user_interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  user_list!: user[]
  constructor(private _chat: ChatService) { }
  ngOnInit(): void {
    this._chat.user_list().subscribe({
      next: (res: user[]) => {

        this.user_list = res
      },
    })
  }
  send_user(email:string){
      this._chat.set_chat(email).subscribe( (res)=>{

      })
  }



}
