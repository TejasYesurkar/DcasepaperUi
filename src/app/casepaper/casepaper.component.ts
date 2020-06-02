import { Component, OnInit,HostListener, ViewChild } from '@angular/core';
import * as moment from 'moment/moment';
import { MatDialog } from '@angular/material';
import hotkeys from 'hotkeys-js';
import { MyprofileComponent } from '../myprofile/myprofile.component';
import { HttpClient } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { WorkdoneComponent } from './workdone/workdone.component';
import { CheifcompComponent } from './cheifcomp/cheifcomp.component';
import { ConfirmationDialogComponent } from '../components/shared/confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';
import {forkJoin} from 'rxjs';
import { map, startWith } from "rxjs/operators";
import { BillComponent } from '../bill/bill.component';
import { AddappointmentComponent } from '../addappointment/addappointment.component';
import { PrescriptionComponent } from '../prescription/prescription.component';
import { MyserviceService } from '../services/myservice.service';
import { FormControl } from '@angular/forms';
import { Profile  } from './profile';
export enum KEY_CODE {
  
  RIGHT_ARROW = 80,
  LEFT_ARROW = 37,
  WROK = 87,
  CHEIF = 67
}
export interface DialogData {
  date: Date;
  complain: string;
}
export interface WorkDone {
  date:Date,
  treatDone:string,
  details:string,
  advised:string,
  paid:string,
  bal:string,
  prescription:string
}

@Component({
  selector: 'app-casepaper',
  templateUrl: './casepaper.component.html',
  styleUrls: ['./casepaper.component.css']
})
export class CasepaperComponent implements OnInit {
  patientList:any;
  patDetailsFetch:any;
  patDetailsAdd2:object ={
    "patName":"false"
  }
  // patDetailsFetch: Profile[]=[];
  opened = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  comp: any;
  options: string[]=[] ;
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  profile: any;
  history:any;
  cheifcomp=[];
  workdone=[];
  patname: any;
  patRef: any;
  pathistory: any;
  patMob: any;
  patEmail: any;
  App: any;


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.shiftKey && event.which === KEY_CODE.RIGHT_ARROW) { 
        // this.opened = true;
        if(this.patname==null)
        {return}
        this.openViewPatientProfile();
    }
    if (event.shiftKey && event.which === KEY_CODE.CHEIF) { 
      this.openCheif()
    }
    if (event.shiftKey && event.which === KEY_CODE.WROK) { 
       
        this.openwork()
    }
  }
  Cdate: Date;
  complain: string;

  Wdate:Date;
  treatDone:string;
  details:string;
  advised:string;
  paid:string;
  bal:string;
  prescription:string
  constructor(private http: HttpClient ,public dialog: MatDialog,private myserv:MyserviceService) { }

  ngOnInit() {
    this.fetchPatientList();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  search(str){
    this.myserv.getPatientDetails(str).subscribe(result=>{
      this.patDetailsFetch= result;
      
      this.patname = this.patDetailsFetch[0].patName;
      this.patEmail = this.patDetailsFetch[0].email;
      this.patMob = this.patDetailsFetch[0].mobile;
      this.pathistory = this.patDetailsFetch[0].history;
      this.patRef = this.patDetailsFetch[0].referredby;
      this.App = this.patDetailsFetch[0].appointment;
      // let patDet = new Profile(+result[0].patId,result[0].name,result[0].dob,result[0].email,
      //   result[0].gender,result[0].address,result[0].refferedBy,result[0].family,result[0].anniversary,result[0].prevDent,result[0].prevTreat,
      //   result[0].routing,result[0].habbit,result[0].cosmetic,result[0].history,result[0].appointment);
      // this.patDetailsFetch.push(patDet)
      // console.log(this.patDetailsFetch)
    })
  }  
  fetchPatientList(){
    this.myserv.getPatientList().subscribe(result=>{
      this.patientList= result;
      for(let i=0;i<this.patientList.length;i++){
        this.options.push(this.patientList[i].patName);
      }
      console.log(this.options);
    })
  }

  Fetchdata() {
     this.profile=  this.http.get('http://woxino2096.pythonanywhere.com/dcp_api/patient-profile/1/?format=json');
     this.history=  this.http.get('http://woxino2096.pythonanywhere.com/dcp_api/patient-profile/1/?format=json');
     
     return forkJoin([this.profile,this.history]);

     }

  //  FecthPromise(){
  //        const urls = [
  //     'http://woxino2096.pythonanywhere.com/dcp_api/patients/400/',
  //     "https://jsonplaceholder.typicode.com/posts/2",
  //     "https://jsonplaceholder.typicode.com/posts/3",
    
  //   ];
  
  //   const allRequests = urls.map(url => 
  //     fetch(url).then(response => response.json())
  //   );
  
  //   return Promise.all(allRequests);
   

  //  }  

  openViewPatientProfile(): void {
    const dialogRef = this.dialog.open( MyprofileComponent,
       {
        width: '150%',
        data:this.patDetailsFetch
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // opened = false;
  
    });   

  }


 openNewPatient(): void {
    const dialogRef = this.dialog.open( MyprofileComponent,
       {
        width: '150%',
        data:this.patDetailsAdd2
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // opened = false;
  
    });   

  }



  openBill(): void {
    const dialogRef = this.dialog.open( BillComponent,
       {
        width: '150%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // opened = false;
  
    });   

  }

  openAppointAdd(): void {
    const dialogRef = this.dialog.open( AddappointmentComponent,
       {
        width: '150%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // opened = false;
  
    });   

  }

  openPrescription(): void {
    const dialogRef = this.dialog.open( PrescriptionComponent,
       {
        width: '150%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // opened = false;
  
    });   

  }
  openwork() {
    const dialogRef = this.dialog.open(WorkdoneComponent, {
      width: '450px',
      data: {date: this.Wdate, treatDone: this.treatDone,details:this.details,advised:this.advised,paid:this.paid,balance:this.bal,prescription:this.prescription}
    });
  
    dialogRef.afterClosed().subscribe(result => {
   
      console.log(result);
      this.workdone.push({date: moment(result.date).format("DD-MMM-YYYY"), treatDone: result.treatDone,details:result.details,advised:result.advised,paid:result.paid,balance:result.bal,prescription:result.prescription});
      this.openconfirmation('work')
    });
    
  }
openCheif() {

  const dialogRef = this.dialog.open(CheifcompComponent , {
    width: '400px',
    data: {data: this.Cdate, animal: this.complain}
    
  });

  dialogRef.afterClosed().subscribe(result => {
 
    
    this.cheifcomp.push({date:moment(result.date).format("DD-MMM-YYYY"),complain:result.complain});
     this.openconfirmation('cheifcomp')
  });
}

openconfirmation(str): void {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '350px',
    data: "Do you Really want to add this data?"
  });
  dialogRef.afterClosed().subscribe(result => {

    switch(str){
      case 'work': 
                if(result) {
                  return true;
                }else{
                  this.workdone.pop();
                }
      break;
      case 'cheifcomp': 
                if(result) {
                  return true;
                }else{
                  this.cheifcomp.pop();
                }
      
      break;
    }


    
  });

}
}
