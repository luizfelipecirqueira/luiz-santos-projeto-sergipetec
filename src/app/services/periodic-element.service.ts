import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { PeriodicElement } from '../models/PeriodicElement';

@Injectable()
export class PeriodicElemenntService {
  
  elementApiUrl = "http://localhost:3000/contribuintes/";
  
  constructor(private http:HttpClient){}

  getElements(): Observable<PeriodicElement[]>{
    return this.http.get<PeriodicElement[]>(this.elementApiUrl);
    
  }
}