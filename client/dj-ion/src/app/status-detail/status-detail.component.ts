import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
 
import { StatusAPIService } from '../status/status.service';

@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.component.html',
  styleUrls: ['./status-detail.component.css']
})
export class StatusDetailComponent implements OnInit {
   detailId: any;
   statusItem: any;
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
        this.statusAPI.get(number).subscribe(data=>{
          console.log(data)
          this.statusItem = data
        })
      }



  }

  goBack(){
      this.location.back()
  }


}
