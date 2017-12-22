import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';


@Component({
  selector: 'app-status-create',
  templateUrl: './status-create.component.html',
  styleUrls: ['./status-create.component.css']
})
export class StatusCreateComponent implements OnInit {
    statusForm: FormGroup;
    // status  = {content: ''}

  constructor() { }

  ngOnInit() {
      this.statusForm = new FormGroup({
          'content': new FormControl("", [
                  Validators.required,
                  Validators.minLength(4),
                  Validators.maxLength(280)
             ])

      })
  }

  handleSubmit(event:any, statusDir:NgForm, statusForm:FormGroup){
      event.preventDefault()
      if (statusDir.submitted){
          console.log(statusForm.value)
          // interact with the server

          statusDir.resetForm({content: "some new content"})
      }
  }
      

  get content(){
      return this.statusForm.get("content")
  }

}
