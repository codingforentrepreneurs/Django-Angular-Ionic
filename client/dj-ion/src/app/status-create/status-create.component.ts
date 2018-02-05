import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';

import { Status } from '../status/status';
import { StatusAPIService } from '../status/status.service';

@Component({
  selector: 'app-status-create',
  templateUrl: './status-create.component.html',
  styleUrls: ['./status-create.component.css']
})
export class StatusCreateComponent implements OnInit, OnDestroy{
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
      this.content  = new FormControl("", [
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

  textAreaChanged(){
    console.log("Changed")
  }
  textAreaClicked(){
    console.log("clicked")
  }
  textAreaKeyup(){
    console.log(this.myContentText.nativeElement.value)
  }

  clearMyTextArea(event){
    event.preventDefault()
    this.myContentText.nativeElement.value = ""
  }

  callFileInput(event){
    console.log("trigger file input")
    event.preventDefault()
    this.myImageInput.nativeElement.click()
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
        this.router.navigate(["/status", this.newStatus.id])

      }
    }


  
  handleSubmit(event:any, statusDir:NgForm, statusForm:FormGroup){
      event.preventDefault()
      this.statusDir = statusDir
      if (statusDir.submitted){

          let submittedData = statusForm.value

          this.statusCreateSub = this.statusAPI.createAndUpload(
              this.imageToUpload, 
            submittedData).subscribe(
                event=>{
                  this.handleProgress(event)
                 }, 
                error=>{
                    this.handleError(error)
                });

          statusDir.resetForm({})
      }
  }
   handleFileInput(files: FileList) {
        let fileItem = files.item(0);
        console.log("file input has changed. The file is", fileItem)
        if (fileItem){
          this.newFileName = fileItem.name
          this.imageToUpload = fileItem
        }
    }

    resetFileInput() {
        console.log(this.myImageInput.nativeElement.files);
        this.newFileName = null;
        this.myImageInput.nativeElement.value = "";
        console.log(this.myImageInput.nativeElement.files);
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

  // handleSubmit(event:any, statusDir:NgForm, statusForm:FormGroup){
  //     event.preventDefault()
  //     if (statusDir.submitted){
  //         // console.log(statusForm.value)
  //         let content = statusForm.value['content']
  //         this.statusAPI.create(content).subscribe(data=>{
  //             console.log(data)
  //             this.newStatus = data as Status
  //             // this.router.navigate([`/status/${this.newStatus.id}`])
  //             this.router.navigate(["/status", this.newStatus.id]) // /status/1
  //         }, errorResponse=> {
  //             let statusCode = errorResponse.status
  //             switch (statusCode) {
  //               case 401: // http status codes
  //                 this.errorMsg = "Authentication Error. (401 Error)"
  //                 this.errorMsg = errorResponse['error']['detail']
  //                 break;
  //               case 403:
  //                 this.errorMsg = "Authentication Error. (403 Error)"
  //                 break;
  //               default:
  //                 this.errorMsg = `There was an error. Please try again later. (${statusCode} Error)`
  //                 break;
  //             }
  //         }) 

  //         statusDir.resetForm({content: "some new content"})
  //     }
  // }
      

  // get content(){
  //     return this.statusForm.get("content")
  // }

}
