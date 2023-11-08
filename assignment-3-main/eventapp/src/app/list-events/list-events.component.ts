import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit{
  eventsDB: any[] = [];

  constructor(private dbService: DatabaseService, private router:Router) { }

  ngOnInit() {
    this.dbService.getEvents().subscribe((data: any) => {
      this.eventsDB = data;
    });
  }

  viewEvent(item: any){
    this.dbService.set_curr_event(item.eventId)
    this.router.navigate(['/display-event'])
  }

}

