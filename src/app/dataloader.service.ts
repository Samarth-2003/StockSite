import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { StockValue } from 'src/StockValue';

@Injectable({
  providedIn: 'root'
})
export class DataloaderService {
 
  constructor(private http: HttpClient) { }
 
 
  getData(url:string,com:string,type:string) {
    let param = new HttpParams().set("CompanyName",com).set("DataType",type);
    return this.http.get(url,{params:param})
 }


 getDataSynchronous(url:string,com:string,type:string):Promise<any>{
   return lastValueFrom(this.getData(url,com,type));
 }
}
