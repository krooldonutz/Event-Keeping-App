import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})

export class UpdateEventComponent implements OnInit {
  eventId: string = "";
  name: string = "";
  capacity: number = 0;

  eventsDB: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {}
  
  onSelectUpdate(item: any){
    this.eventId = item.eventId;
    this.name = item.name;
    this.capacity = item.capacity;
  }

  //Get all Events
  onGetEvents() {
    this.dbService.getEvents().subscribe((data: any) => {
      this.eventsDB = data;
    });
  }

  onUpdateEvent() {
    let obj = { name: this.name, capacity: this.capacity, eventId: this.eventId };
    this.dbService.updateEvent(obj).subscribe(
      (result) => {
        this.onGetEvents();
        this.refreshEventList();
      },
      (error) => {
        if (error.status === 400 || 505) {
          this.router.navigate(["/invalid-data"]);
        }
      }
    );
  }  

  refreshEventList() {
    // Fetch the updated category list again after an update
    this.dbService.getEvents().subscribe(
      (data: any) => {
        this.eventsDB = data;
      },
      (error) => {
        if (error.status === 400) {
          this.router.navigate(["/invalid-data"]);
      }}
    );
  }

  ngOnInit() {
    this.onGetEvents();
  }
}


