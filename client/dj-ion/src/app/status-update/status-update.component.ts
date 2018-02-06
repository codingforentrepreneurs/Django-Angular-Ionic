import { Component, EventEmitter,  OnInit, OnDestroy, Input, Output} from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

import { Status } from '../status/status';
import { StatusAPIService } from '../status/status.service';

@Component({
  selector: 'status-update',
  templateUrl: './status-update.component.html',
  styleUrls: ['./status-update.component.css']
})
export class StatusUpdateComponent implements OnInit, OnDestroy {
    statusForm: FormGroup;
    content: FormControl;
    viewEditForm:boolean = false;
    statusDir: NgForm;
    @Input() statusItem: Status;
    count = 0
    @Output() statusUpdated = new EventEmitter<Status>();
    statusUpdateSub: any;

    isUserOwner = true; // solve this issue



  constructor(private statusAPI:StatusAPIService) { }

  ngOnInit() {
      // console.log(this.statusId)
      if (this.statusItem){


      this.content  = new FormControl(this.statusItem.content, [
                  Validators.minLength(4),
                  Validators.maxLength(280)
             ])
      this.statusForm = new FormGroup({
          'content': this.content
      })
      }
  }

  ngOnDestroy(){
    if (this.statusUpdateSub){
      this.statusUpdateSub.unsubscribe()
    }
  }

  handleSubmit(event:any, statusDir:NgForm, statusForm:FormGroup){
      event.preventDefault()
      this.statusDir = statusDir
      if (statusDir.submitted){
          let submittedData = statusForm.value

          let newStatusItem = new Status()
          newStatusItem.id = this.statusItem.id
          newStatusItem.content = statusForm.value.content
          newStatusItem.image = null;

          this.statusUpdateSub = this.statusAPI.update(
            newStatusItem
           ).subscribe(data=>{
             this.statusItem = data as Status
             this.statusUpdated.emit(this.statusItem)
           }, error=>{
             console.log(error)
           })

           this.toggleFormView()
      }
  }


  toggleFormView(){
    this.viewEditForm = !this.viewEditForm
  }

  buttonPressed(event){
      this.toggleFormView()
      this.count = this.count + 1
      // this.didUpdate.emit({count: this.count, status:this.statusId})
      // console.log(this.statusItem)
      if (this.statusItem){
          
          // no image
          
          
      }
      
  }

}
