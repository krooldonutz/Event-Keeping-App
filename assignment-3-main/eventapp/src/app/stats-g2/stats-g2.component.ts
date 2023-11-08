import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-stats-g2',
  templateUrl: './stats-g2.component.html',
  styleUrls: ['./stats-g2.component.css']
})
export class StatsG2Component {

  constructor(private dbService: DatabaseService) { 
    this.getStats();
  }

  record: any;

  getStats(){
    this.dbService.getRecord().subscribe((record: any) => {
      this.record = record;
    })
  }
}

  


