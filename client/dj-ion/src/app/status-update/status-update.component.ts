import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'status-update',
  templateUrl: './status-update.component.html',
  styleUrls: ['./status-update.component.css']
})
export class StatusUpdateComponent implements OnInit {
    @Input()
    statusId: number;

  constructor() { }

  ngOnInit() {
      console.log(this.statusId)
  }

}
