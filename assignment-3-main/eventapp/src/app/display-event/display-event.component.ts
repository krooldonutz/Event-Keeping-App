import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-display-event',
  templateUrl: './display-event.component.html',
  styleUrls: ['./display-event.component.css']
})
export class DisplayEventComponent implements OnInit{
  events: any[] = [];
  currEvent: any;

  
    constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    let id = this.dbService.get_curr_event()
    this.dbService.getEvents().subscribe((data: any) => {
      this.events = data;
      this.currEvent = this.events.find(event => event.eventId === id)
    });
  }

}

