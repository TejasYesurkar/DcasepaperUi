import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../casepaper/profile';
export interface DialogData {
  date: string;
  complain: string;
}
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  userForm:FormGroup;
  dataPat:Profile;
  str:string;
  constructor(private formBuilder: FormBuilder,private http:HttpClient,
    public dialogRef: MatDialogRef<MyprofileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profile) {}

// constructor() { }

ngOnInit() {
 
//   this.dataPat = this.data
//   var keys = Object.keys(this.data);
// var len = keys.length;
//   console.log(len);
  this.userForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    dob: ['',[Validators.required]],
    address: ['', [Validators.required]],
    email: ['', [Validators.required,Validators.email]],
    gender: ['', [Validators.required]],
    RefferedBy: ['', [Validators.required]],
    family: ['', [Validators.required]],
    mobile: ['', [Validators.required]],
    Anniversary: ['', [Validators.required]],
    prevDent: ['', [Validators.required]],
    prevTreat: ['', [Validators.required]],
    svcling: ['', [Validators.required]],
    habbit: ['', [Validators.required]],
    brushing: ['', [Validators.required]],
    hygine: ['', [Validators.required]],
    concerns: ['', [Validators.required]],
    history: ['', [Validators.required]]
  });

  if(this.data.patName!=("false")){
    
    this.userForm.controls['name'].setValue(this.data[0].patName);
    this.userForm.controls['dob'].setValue(this.data[0].dob);
    this.userForm.controls['address'].setValue(this.data[0].address);
    this.userForm.controls['email'].setValue(this.data[0].email);
    this.userForm.controls['gender'].setValue(this.data[0].gender);
    this.userForm.controls['RefferedBy'].setValue(this.data[0].referredby);
    this.userForm.controls['family'].setValue(this.data[0].fmaily);
    this.userForm.controls['mobile'].setValue(this.data[0].mobile);
    this.userForm.controls['Anniversary'].setValue(this.data[0].anniversary);
    this.userForm.controls['prevDent'].setValue(this.data[0].prevDentist);
    this.userForm.controls['prevTreat'].setValue(this.data[0].prevTreat);
    this.userForm.controls['svcling'].setValue(this.data[0].routing);
    this.userForm.controls['habbit'].setValue(this.data[0].habit);
    this.userForm.controls['brushing'].setValue(this.data[0].brushing);
    this.userForm.controls['hygine'].setValue(this.data[0].hygine);
    this.userForm.controls['history'].setValue(this.data[0].medicalhistory);
    this.userForm.controls['concerns'].setValue(this.data[0].cosmetic);
    document.getElementById("view").style.visibility = "hidden"; 
    document.getElementById("view1").style.visibility = "hidden"; 
  }else{
    document.getElementById("dentall").style.visibility = "hidden"; 
    document.getElementById("dental1").style.visibility = "hidden"; 
  }
}
onSubmit (): Observable<Object> {
  const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept':'application/json, text/javascript, */*; q=0.01'
  });

   this.http.post<any>("https://tejasyesurkar.000webhostapp.com/myhospital/insertPatient.php", this.userForm.value, {headers: headers}).subscribe(res=>{
    
   console.log(res);
    for(let i=0; i<res.length; i++){
      
      alert(res[i].status);
      if(res[i].status.equals( "Register Successfully.")){
        this.userForm.reset
      }
    }
  },error=>{
    this.data =error;
   
  });
  return ;
}

}
