import { Component, OnInit } from '@angular/core';


import { StatusAPIService } from './status.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
    results = []
  constructor(private statusAPI: StatusAPIService) { }

  ngOnInit() {
    this.results = this.statusAPI.list()
  }

}
