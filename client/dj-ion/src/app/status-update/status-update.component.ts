import { Component, EventEmitter,  OnInit, Input, Output} from '@angular/core';


import { Status } from '../status/status';
@Component({
  selector: 'status-update',
  templateUrl: './status-update.component.html',
  styleUrls: ['./status-update.component.css']
})
export class StatusUpdateComponent implements OnInit {
    @Input() statusId: number;
    @Input() statusItem: Status;
    count = 0

    @Output() didUpdate = new EventEmitter();
    @Output() statusUpdated = new EventEmitter<Status>();


  constructor() { }

  ngOnInit() {
      // console.log(this.statusId)
  }

  buttonPressed(event){
      this.count = this.count + 1
      this.didUpdate.emit({count: this.count, status:this.statusId})
      // console.log(this.statusItem)
      if (this.statusItem){
          this.statusUpdated.emit(this.statusItem)
      }
      
  }

}
