import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-chat',
  templateUrl: './social-chat.component.html',
  styleUrls: ['./social-chat.component.css']
})

export class SocialChatComponent implements OnInit {
  messages : any = {actual: this.newMessage(), history:[]};

  constructor() { }

  ngOnInit() {
  }

  sendText(){
    this.messages.history[this.messages.history.length] = this.messages.actual;
    this.messages.actual = this.newMessage();

    var objDiv = document.getElementById("divChatWindow");
    objDiv.scrollTop = objDiv.scrollHeight;
    document.getElementById("txtMessage").focus();
  }

  newMessage(){
    return {text:"", user:"", date:"", sended:false, readed:false};
  }
}