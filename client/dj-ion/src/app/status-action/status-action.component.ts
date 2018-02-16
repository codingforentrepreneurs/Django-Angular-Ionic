import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';

import { Status } from '../status/status';
import { StatusAPIService } from '../status/status.service';


@Component({
  selector: 'status-action',
  templateUrl: './status-action.component.html',
  styleUrls: ['./status-action.component.css']
})
export class StatusActionComponent implements OnInit {
    // Handles Create, Update and Delete of the Status Item

    // create related
    @Input() isStatusListView = false // is the current component a list?    
    @Output() statusItemCreated = new EventEmitter<Status>() // is a Event

    // update related
    @Input() statusItemToUpdate: Status;
    @Output() statusUpdated = new EventEmitter<Status>();

    viewEditForm = true;
    viewToggleBtn = false;

    newStatus: Status;
    statusForm: FormGroup;
    content: FormControl;
    errorMsg: string;
    statusCreateSub: any;
    statusDir: NgForm;
    imageToUpload: File  = null;
    uploadProgress:number = 0;
    uploadComplete:boolean = false;
    uploadingProgressing:boolean = false;
    serverResponse: any;
    newFileName: string;

    @ViewChild('myFileInput')
    myImageInput: any;

    @ViewChild('myTextArea')
    myContentText:any;


    // status  = {content: ''}

  constructor(
    private router: Router,
    private statusAPI: StatusAPIService
    ) { }

  ngOnInit() {
      let content = ""
      
      if (this.statusItemToUpdate){
        let objUser = this.statusItemToUpdate.user
        this.viewEditForm = false;
        this.viewToggleBtn = true;
        // let currentUsername = this.authAPI.getUsername()
        // if (objUser.username == currentUsername) {
        //   this.isUserOwner = true
        // }
        content = this.statusItemToUpdate.content
      }
      

      this.content  = new FormControl(content, [
                  Validators.minLength(4),
                  Validators.maxLength(280)
             ])
      this.statusForm = new FormGroup({
          'content': this.content
      })

      // console.log(this.myContentText.value)
  }
  ngOnDestroy(){
    if(this.statusCreateSub){
      this.statusCreateSub.unsubscribe()
    }
  }

  toggleFormView(){
    this.viewEditForm = !this.viewEditForm
  }

  buttonPressed(event){
      this.toggleFormView()
  }

  resetFileInput() {
        this.newFileName = null;
        this.myImageInput.nativeElement.value = "";
   }

  resetProgress(){
    this.uploadProgress = 0;
    this.uploadComplete = false;
    this.uploadingProgressing = false;
  }

  resetMyTextArea(event?){
    if (event){
      event.preventDefault()
    }
    
    this.myContentText.nativeElement.value = ""
  }

  callFileInput(event){
    event.preventDefault()
    this.myImageInput.nativeElement.click()
  }

  handleSuccessfulSave(statusItem){
    // item was saved!!
    this.resetFileInput()
    this.resetMyTextArea()
    this.resetProgress()
     if (!this.isStatusListView){
       this.router.navigate(["/status", statusItem.id])
     } else {
       this.statusItemCreated.emit(statusItem)
     }

  }

   handleProgress(event){
    if (event.type === HttpEventType.DownloadProgress) {
        this.uploadingProgressing =true
        this.uploadProgress = Math.round(100 * event.loaded / event.total)
      }

      if (event.type === HttpEventType.UploadProgress) {
        this.uploadingProgressing =true
        this.uploadProgress = Math.round(100 * event.loaded / event.total)
      }

      if (event.type === HttpEventType.Response) {
        // console.log(event.body);
        this.uploadComplete = true
        this.serverResponse = event.body
        this.newStatus = event.body as Status
        // success! growl 
        this.handleSuccessfulSave(this.newStatus)
        

      }
    }


  
  handleSubmit(event:any, statusDir:NgForm, statusForm:FormGroup){
      event.preventDefault()
      this.statusDir = statusDir
      if (statusDir.submitted){

          let submittedData = statusForm.value
          if (this.statusItemToUpdate){
            let newStatusItem = new Status()
              newStatusItem.id = this.statusItemToUpdate.id
              newStatusItem.content = statusForm.value.content
              newStatusItem.image = null;

              this.statusCreateSub = this.statusAPI.update(
                newStatusItem
               ).subscribe(data=>{
                 this.statusItemToUpdate = data as Status
                 this.statusUpdated.emit(this.statusItemToUpdate)
               }, error=>{
                 console.log(error)
               })
          } else {
             this.statusCreateSub = this.statusAPI.createAndUpload(
              this.imageToUpload, 
            submittedData).subscribe(
                event=>{
                  this.handleProgress(event)
                 }, 
                error=>{
                    this.handleError(error)
                });
          }
         

          statusDir.resetForm({})
      }
  }
   handleFileInput(files: FileList) {
        let fileItem = files.item(0);
        if (fileItem){
          this.newFileName = fileItem.name
          this.imageToUpload = fileItem
        }
    }


    handleError(errorResponse:any){
      let statusCode = errorResponse.status
        switch (statusCode) {
          case 401: // http status codes
            this.errorMsg = "Authentication Error. (401 Error)"
            this.errorMsg = errorResponse['error']['detail']
            break;
          case 403:
            this.errorMsg = "Authentication Error. (403 Error)"
            break;
          default:
            this.errorMsg = `There was an error. Please try again later. (${statusCode} Error)`
            break;
        }
    }

}
