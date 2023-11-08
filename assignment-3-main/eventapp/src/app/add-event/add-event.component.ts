import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  eventId: string = "";
  name: string = "";
  description: string = "";
  startDateTime: Date = new Date();
  duration: number = 0;
  isActive: boolean = true;
  image: string = "";
  capacity: number = 0;
  ticketsAvailable: number = 0;
  categoryId: string = "";

  constructor(private dbService: DatabaseService, private router: Router) { 

  }

  saveEvent() {
    // Create the newEvent object
    let newEvent = {
      eventId: this.eventId,
      name: this.name,
      description: this.description,
      startDateTime: this.startDateTime,
      duration: this.duration,
      isActive: this.isActive,
      image: this.image,
      capacity: this.capacity,
      ticketsAvailable: this.ticketsAvailable == null ? this.capacity : this.ticketsAvailable,
      categoryId: this.categoryId
    };

    // Call the service method to save the event
    this.dbService.addEvent(newEvent).subscribe(result => {
      // Navigate to the list-events route after successful addition
      this.router.navigate(["/list-events"]);
    }, (error) => {
      // Handle error based on the type of error
      if (error.status === 500 || 400) {
        // Handle 404 error (Not Found)
        this.router.navigate(["/invalid-data"]);
    }


  });
}
}

