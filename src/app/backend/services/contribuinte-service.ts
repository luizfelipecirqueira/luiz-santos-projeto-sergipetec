import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ContribuinteElement } from '../models/ContribuinteElement';

@Injectable()
export class ContribuinteElementService {
  
  elementApiUrl = "http://localhost:3000/contribuintes/";
  
  constructor(private http:HttpClient){}

  getElements(): Observable<ContribuinteElement[]>{
    return this.http.get<ContribuinteElement[]>(this.elementApiUrl).pipe(
      retry(2),
      catchError(this.handleError));
    
  }

  createContribuinte(element: ContribuinteElement): Observable<ContribuinteElement>{
    return this.http.post<ContribuinteElement>(this.elementApiUrl, element).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  editContribuinte(element: ContribuinteElement): Observable<ContribuinteElement>{
    return this.http.put<ContribuinteElement>(this.elementApiUrl + '/' + element.id, element).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deleteContribuinte(id: number): Observable<any>{
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