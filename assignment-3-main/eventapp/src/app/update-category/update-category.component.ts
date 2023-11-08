import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit{
  nameCurr: string = ""
  descCurr: string = ""
  imageCurr: string = ""
  idCurr: string = ""
  
  categoryDB: any[] = []

  constructor(private dbService: DatabaseService, private router:Router) { }

  previewCategory(item: any){
    this.nameCurr = item.name
    this.descCurr = item.desc
    this.imageCurr = item.image
    this.idCurr = item.categoryID
  }

  updateCategory(){
    this.dbService.updateCategories({name : this.nameCurr, categoryID: this.idCurr, 
                                      desc: this.descCurr,
                                    image: this.imageCurr}).subscribe((data: any) => {
                                      this.ngOnInit();
                                    })
    // console.log(this.categoryDB)
    this.refreshCategoryList();
  }

  refreshCategoryList() {
    // Fetch the updated category list again after an update
    this.dbService.getCategories().subscribe(
      (data: any) => {
        this.categoryDB = data;
      },
      (error) => {
        console.error('Error fetching updated category list:', error);
      }
    );
  }

  ngOnInit() {
    this.dbService.getCategories().subscribe((data: any) => {
      this.categoryDB = data;
    });
  }
}
