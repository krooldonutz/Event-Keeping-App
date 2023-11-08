import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  categories: any[] = [];
  currCategory: any;

  constructor(private dbService: DatabaseService) {}

  // FIX THIS ASAP
  ngOnInit() {
    let id = this.dbService.get_curr_detail()
    this.dbService.getCategories().subscribe((data: any) => {
      this.categories = data;
      this.currCategory = this.categories.find(cat => cat.categoryID === id)
    });
  }
      
      
}
