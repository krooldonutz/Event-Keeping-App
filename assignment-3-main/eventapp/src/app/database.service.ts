import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  currDetailID: string = "";
  lead: string = "/api/v1/category/32578393";

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get('/cherylyn/api/v1/getAll');
  }

  addEvent(newEvent: any) {
    return this.http.post('/cherylyn/api/v1/createEvent', newEvent, httpOptions);
  }

  set_curr_event(ID: string) {
    this.currDetailID = ID;
  }

  get_curr_event() {
    return this.currDetailID;
  }

  deleteEvent(event: any) {
    let id: any = {
      eventId: event.eventId
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: id,
    };

    return this.http.delete("/cherylyn/api/v1/deleteById", options);
  }

  set_curr_detail(ID: string) {
    this.currDetailID = ID;
  }

  get_curr_detail() {
    return this.currDetailID;
  }

  updateCategories(upd: object) {
    return this.http.patch(this.lead + "/update", upd, httpOptions);
  }

  addCategories(categ: object) {
    return this.http.post(this.lead + "/add", categ, httpOptions);
  }

  getCategories() {
    return this.http.get(this.lead + "/list");
  }

  deleteCategories(categ: any) {
    let id: any = {
      categoryID: categ.categoryID
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: id,
    };

    return this.http.delete(this.lead + "/delete", options);
  }

  updateEvent(event: object) {
    return this.http.put("/cherylyn/api/v1/updateById/", event, httpOptions);
  }

  getRecord() {
    return this.http.get("/cherylyn/g2/count", httpOptions);
  }

  getNumOfCateg() {
    return this.http.get(this.lead + "/count");
  }

  getNumOfEvent() {
    return this.http.get("/cherylyn/event/count");
  }
}
