import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

 
public treatmentList:any = [];
apiUrl='http://tejasyesurkar.000webhostapp.com/myhospital/';
  constructor( private http: HttpClient) { }


  getPatientDetails(name) {
    return this.http.get(`${this.apiUrl}viewpatient.php?patname=`+name);
  }
  getPatientList() {
    return this.http.get(`${this.apiUrl}viewpatient.php`);
  }
  gettreatmentlistlist(){
    return this.http.get(`${this.apiUrl}viewtreatment.php`);
  }

}
