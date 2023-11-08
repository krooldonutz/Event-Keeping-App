import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent {
  categoryName: string = ""
  categoryDesc: string = ""
  categoryImage: string = ""

  constructor(private dbService: DatabaseService, private router: Router) { }

  onSaveCategory(){
    let obj  = { name: this.categoryName, desc: this.categoryDesc, image: this.categoryImage };
    this.dbService.addCategories(obj)
    this.dbService.addCategories(obj).subscribe(result => {
      this.router.navigate(["/listcategory"]);
    });
  }

}
