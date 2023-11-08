import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit{

  categoryDB: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit() {
    console.log("Hi From DeleteCategory ngIOnit");

    this.dbService.getCategories().subscribe((data: any) => {
      this.categoryDB = data;
    });
  }

  delCategory(item: object){
    this.dbService.deleteCategories(item).subscribe((data: any) => {
      // this.router.navigate(["/deletecategory"]);
      this.ngOnInit()
    });
  }

}
