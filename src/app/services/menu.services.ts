import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommandeWeb } from '../models/commandeWeb';

@Injectable({
  providedIn: 'root'
})
export class MenuServicce {
    urlApi:string="http://192.168.1.221:7004/api/";

  constructor(private http: HttpClient) { }

  getArticleByCodeFamille(codeFamille:string,afficherTout:boolean){
    return this.http.get<any>(this.urlApi+"Articles/"+codeFamille).toPromise();
  }
  getAllFamille( ){
    return this.http.get<any>( this.urlApi+"Articles/AllFamille/Sort/data").toPromise();
  }
  getPaarametreDiversTaux(){
    return this.http.get<any>(this.urlApi+"ParametreDivers/Utilities").toPromise();
   }
   getClientPassager(){
    return this.http.get<any>(this.urlApi+"ParametreDivers").toPromise();
   }
   getAllTva(){
    return this.http.get<any>(this.urlApi+"Tvas").toPromise();
   }
   getAllProduct(){
    let famille:string="all"
    return this.http.get<any>(this.urlApi+"Articles/Product/"+famille).toPromise();
   }
   addCommande(obj: CommandeWeb) {
    return this.http.post<any>(  this.urlApi+'CommandeWebs/AddCommande', obj).toPromise();
  }
}
