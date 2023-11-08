import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eventapp';
  eventNum: number = 0;
  categNum: number = 0;

  constructor(private database: DatabaseService) {}

  ngOnInit(): void {
    // Update properties every 5 seconds (5000 milliseconds)
    setInterval(() => {
      this.updateEventNum();
      this.updateCategNum();
    }, 1000);
  }

  private updateEventNum() {
    this.database.getNumOfEvent().subscribe((data: any) => {
      this.eventNum = data;
    });
  }

  private updateCategNum() {
    this.database.getNumOfCateg().subscribe((data: any) => {
      this.categNum = data;
    });
  }
}
