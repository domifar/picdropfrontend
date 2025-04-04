import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRequest {
  private ip: string = '10.10.3.64:3001';

  constructor(private http: HttpClient) { }

  getWorkspaces(): Observable<any[]> {
    return this.http.get<any[]>('http://' + this.ip + '/workspaces');
  }

  getVouchers(): Observable<any[]> {
    return this.http.get<any[]>('http://' + this.ip + '/vouchers');
  }

  getTime(): Observable<any> {
    return this.http.get<any[]>('http://' + this.ip + '/submissionitems');
  }
}
