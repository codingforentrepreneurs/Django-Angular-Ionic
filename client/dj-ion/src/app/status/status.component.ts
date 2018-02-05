import { Component, OnInit, OnDestroy} from '@angular/core';

import { Status } from './status';

import { StatusAPIService } from './status.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnDestroy{
    results:Status[] = []
    statusListSub:any;
    refreshCount = 0
  constructor(private statusAPI: StatusAPIService) { }

  ngOnInit() {
    this.getData()
  }

  getData(){
    this.statusListSub = this.statusAPI.list().subscribe(data=>{
      //console.log(data)
      this.results = data.results // as [Status]
    })
  }

  ngOnDestroy(){
    if (this.statusListSub){
      this.statusListSub.unsubscribe()
    }
  }

  statusDidUpdate(){
    this.getData()
    this.refreshCount = this.refreshCount +1
    console.log("refreshed", this.refreshCount, "times")
  }

}
