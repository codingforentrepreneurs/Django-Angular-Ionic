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

  replaceWith(array, ogItem, newItem){
    let ogItemIndex = array.indexOf(ogItem)
    const numberOfItemsToRemove = 1
    array.splice(ogItemIndex, numberOfItemsToRemove, newItem)
    return array
  }

  statusDidCreate(event){
    let newStatusItem = event as Status
    this.results.unshift(newStatusItem) // prepend
    // this.results.push(newStatusItem) // apppend
    // this.replaceWith(this.results, statusItem, newStatusItem)
  }

  statusDidUpdate(event, statusItem){
    let newStatusItem = event as Status
    this.replaceWith(this.results, statusItem, newStatusItem)
  }

}
