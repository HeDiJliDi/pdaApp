import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
    urlApi:string=environment.urlApi;

  constructor(private http: HttpClient) { }
  getFamilleArticleLook(){
   return this.http.get<any>(this.urlApi+"FamilleArticles/lookUp").toPromise();
  }
  getNEwCodeArticle(codeFamille:string){
    return this.http.get<any>(this.urlApi+"Articles/codeArticle/"+codeFamille).toPromise();
  }
  geUniteArticlesLook(){
    return this.http.get<any>(this.urlApi+"UniteArticles/lookUp").toPromise();
   }
   getDepotsLook(){
    return this.http.get<any>(this.urlApi+"Depots/lookUp").toPromise();
   }
   getDepotsStockLook(){
    return this.http.get<any>(this.urlApi+"Depots/lookUp/stocks").toPromise();
   }
    getTypeArticlesLook(){
    return this.http.get<any>(this.urlApi+"TypeArticles/lookUp").toPromise();
   }
    getMarqueArticlesLook(){
    return this.http.get<any>(this.urlApi+"MarqueArticles/lookUp").toPromise();
   }
   getTvaLook(){
    return this.http.get<any>(this.urlApi+"Tvas/lookUp").toPromise();
   }
   getNewCodeFamille(){
    return this.http.get<any>(this.urlApi+"Articles/codeFamille").toPromise();
   }
}
