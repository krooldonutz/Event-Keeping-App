import { Component } from '@angular/core';
import { io } from 'socket.io-client';

interface Translate {
  text: string;
  target: string;
  translation: string;
}

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css']
})
export class TranslatorComponent {
  translate: Translate = {text: '', target: '', translation: '' };
  allTranslate: Translate[] = [];
  socket: any;

  text = '';
  target = '';
  translation = '';

  constructor(){
    this.socket = io();
  }

  ngOnInit() {
    this.listen2Events();
  }

  listen2Events() {
    this.socket.on("translate", (data: any) => {
      this.allTranslate.push(data);
      console.log("listen" + data);
    });
  }

  sendMessage() {
    let message={
      text: this.text,
      target: this.target,
    }
    this.socket.emit("newMsg", message);
    console.log("hi"+message);
  }

}
