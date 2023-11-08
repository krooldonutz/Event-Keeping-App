import { Component } from '@angular/core';
import * as textToSpeech from "@google-cloud/text-to-speech";
import { DatabaseService } from '../database.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.css']
})
export class TextToSpeechComponent {
  textBox: string = "";
  soundPath: string = "";
  audio: HTMLAudioElement;

  constructor(private database: DatabaseService) {
    this.audio = new Audio()
  }

  textToSpeech() {
    const socket = io('http://localhost:8080');

    // Emit the text to the backend via socket
    socket.emit('textToSpeech', { text: this.textBox });
    console.log(this.textBox);

    // Listen for the response from the backend
    socket.on('speechOutput', (mp3Path: string) => {
      this.soundPath = "./" + mp3Path + '?';
      console.log('Received MP3 path from backend:', mp3Path);

      // Load and play the audio after receiving the mp3Path
      this.audio = new Audio(this.soundPath + new Date().getTime())
      // this.audio.src = this.soundPath;
      this.audio.load();
      this.audio.play();
    });
  }
}
