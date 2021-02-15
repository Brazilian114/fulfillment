import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as xml2js from "xml2js"
@Injectable({
  providedIn: 'root'
})
export class WebServiceService {
  public hostWebService: string;
  public WebServiceUploadPic: string;
  url: string;
  constructor(public storage:Storage,public http:HttpClient) { 


      // this.hostWebService = "http://192.168.1.252/RF-Service_FulFillment/RFService.asmx";
      
      this.hostWebService = "http://203.150.244.167/rf-service_anajak/RFService.asmx";

  }
  get_login(Username, Password) {
   
    let parameters = 'oUsername=' + Username + '&oPassword=' + Password;
    return this.http.get(this.hostWebService + "/Check_Login?" + parameters,{ responseType: 'text' })
       .toPromise()
       .then(response => {
          let a;
          xml2js.parseString(response, function (err, result) {
             a = result;
          });
          try {
             return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
          }
          catch (e) {
             return [];
          }
       }
       );
  }
}
