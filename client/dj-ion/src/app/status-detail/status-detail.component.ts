import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
 
import { Status } from '../status/status';

import { StatusAPIService } from '../status/status.service';
@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.component.html',
  styleUrls: ['./status-detail.component.css']
})
export class StatusDetailComponent implements OnInit, OnDestroy{
   detailId: any;
   statusItem: Status;
   statusDetailSub: any;

  constructor(
      private statusAPI: StatusAPIService,
      private location: Location,
      private route: ActivatedRoute,
      ) { }

  ngOnInit() {
      this.detailId = this.route.snapshot.paramMap.get('id')
      let number = parseInt(this.detailId)
      if (!number){
          alert("Hey not a valid route")
          this.goBack()
      } else {
        this.statusDetailSub = this.statusAPI.get(number).subscribe(data=>{
          this.statusItem = data
        })
      }
  }
  ngOnDestroy(){
    if (this.statusDetailSub){
      this.statusDetailSub.unsubscribe()
    }
  }

  goBack(){
      this.location.back()
  }

  handleUpdate(event){
      // Handles event emitter for the Status Update component
      // console.log(event)
       console.log("Counts are", event.count, "Status ID is", event.status)

  }

  statusDidUpdate(event){
    console.log("status is", event)
  }


}
