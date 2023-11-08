import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit{

  eventsDB: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.dbService.getEvents().subscribe((data: any) => {
      this.eventsDB = data;
    });
  }

  delEvent(item: object){
    this.dbService.deleteEvent(item).subscribe((data: any) => {
      this.ngOnInit()
    });
  }


};