import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit{
  categoryDB: any[] = [];

  constructor(private dbService: DatabaseService, private router:Router) { }

  ngOnInit() {
    console.log("Hi From ListActors ngIOnit");

    this.dbService.getCategories().subscribe((data: any) => {
      this.categoryDB = data;
    });
  }
  
  viewCategory(item: any){
    this.dbService.set_curr_detail(item.categoryID)
    this.router.navigate(['/categorydetail'])
  }

}

