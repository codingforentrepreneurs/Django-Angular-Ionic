import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Status } from '../status/status';
import { StatusAPIService } from '../status/status.service';

@Component({
  selector: 'app-status-create',
  templateUrl: './status-create.component.html',
  styleUrls: ['./status-create.component.css']
})
export class StatusCreateComponent implements OnInit {
    newStatus: Status;
    statusForm: FormGroup;
    content: FormControl;
    // status  = {content: ''}

  constructor(
    private router: Router,
    private statusAPI: StatusAPIService
    ) { }

  ngOnInit() {
      this.content  = new FormControl("", [
                  Validators.required,
                  Validators.minLength(4),
                  Validators.maxLength(280)
             ])
      this.statusForm = new FormGroup({
          'content': this.content
      })
  }

  handleSubmit(event:any, statusDir:NgForm, statusForm:FormGroup){
      event.preventDefault()
      if (statusDir.submitted){
          // console.log(statusForm.value)
          let content = statusForm.value['content']
          this.statusAPI.create(content).subscribe(data=>{
              console.log(data)
              this.newStatus = data as Status
              // this.router.navigate([`/status/${this.newStatus.id}`])
              this.router.navigate(["/status", this.newStatus.id]) // /status/1
          }) 

          statusDir.resetForm({content: "some new content"})
      }
  }
      

  // get content(){
  //     return this.statusForm.get("content")
  // }

}
