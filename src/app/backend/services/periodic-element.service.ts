import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PeriodicElement } from '../models/PeriodicElement';

@Injectable()
export class PeriodicElemenntService {
  
  elementApiUrl = "http://localhost:3000/contribuintes/";
  
  constructor(private http:HttpClient){}

  getElements(): Observable<PeriodicElement[]>{
    return this.http.get<PeriodicElement[]>(this.elementApiUrl).pipe(
      retry(2),
      catchError(this.handleError));
    
  }

  createElements(element: PeriodicElement): Observable<PeriodicElement>{
    return this.http.post<PeriodicElement>(this.elementApiUrl, element).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  editElement(element: PeriodicElement): Observable<PeriodicElement>{
    return this.http.put<PeriodicElement>(this.elementApiUrl + '/' + element.id, element).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deleteElement(id: number): Observable<any>{
    return this.http.delete<any>(this.elementApiUrl + '/' + id, ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  //Manipulando os erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}