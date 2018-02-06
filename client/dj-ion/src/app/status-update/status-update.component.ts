import { Component, EventEmitter,  OnInit, OnDestroy, Input, Output} from '@angular/core';


import { Status } from '../status/status';
import { StatusAPIService } from '../status/status.service';

@Component({
  selector: 'status-update',
  templateUrl: './status-update.component.html',
  styleUrls: ['./status-update.component.css']
})
export class StatusUpdateComponent implements OnInit, OnDestroy {
    @Input() statusId: number;
    @Input() statusItem: Status;
    count = 0

    @Output() didUpdate = new EventEmitter();
    @Output() statusUpdated = new EventEmitter<Status>();
    statusUpdateSub: any;



  constructor(private statusAPI:StatusAPIService) { }

  ngOnInit() {
      // console.log(this.statusId)
  }

  ngOnDestroy(){
    if (this.statusUpdateSub){
      this.statusUpdateSub.unsubscribe()
    }
  }

  buttonPressed(event){
      this.count = this.count + 1
      this.didUpdate.emit({count: this.count, status:this.statusId})
      // console.log(this.statusItem)
      if (this.statusItem){
          let newStatusItem = new Status()
          newStatusItem.id = this.statusItem.id
          newStatusItem.content = "A whole other thing"
          newStatusItem.image = null;
          // no image
          this.statusUpdateSub = this.statusAPI.update(
            newStatusItem
           ).subscribe(data=>{
             this.statusItem = data as Status
             this.statusUpdated.emit(this.statusItem)
           }, error=>{
             console.log(error)
           })
          
      }
      
  }

}
