import { Component, OnInit} from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { DataView } from 'primeng/dataview';
import { LigneCommandeWeb } from 'src/app/models/ligneCommandeWeb';
import { MenuServicce } from 'src/app/services/menu.services';
import { Utilities } from '../Utilities';
import * as printJS from 'print-js';
import { Article } from 'src/app/models/article';
import { CommandeWeb } from 'src/app/models/commandeWeb';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    products:Article[]=[];
    ajoutAuxPanier:number=0;
    quantite:number=1;
    badgePanier:number=0;
    sortOptions: any[] = [];
    panierDialog:boolean=false;
    sortOrder: number = 0;
    sortField: string = '';
    sourceCities: any[] = [];
    totalPanier:number=0;
    targetCities: any[] = [];
    orderCities: any[] = [];
    articleCommander:any={};
    codeFamille:any="";
    commandeByArticle:boolean=false;
    FiltratedSortOptions: any[] | undefined;
    ligneCommande:LigneCommandeWeb;
    L_ligneCommande:LigneCommandeWeb[]=[];
    clientPassager:any;
    P_DT_TVA:any[];
    AllProduct:any[]=[];
    commandeWeb:CommandeWeb={};
    numeroTable:string="";

    constructor(private route: ActivatedRoute,private menuService:MenuServicce,private utilities:Utilities,private service: MessageService ) { }

    ngOnInit() {
        this.route.params.subscribe(params=>{
            this.numeroTable=params['param1'];
            console.log(this.numeroTable);
        })
      this.menuService.getAllFamille().then((data)=>{this.sortOptions=data;
          console.log(data);
          console.log(this.sortOptions);
      })
      this.menuService.getClientPassager().then(data=> this.clientPassager=data[0])
      this.menuService.getAllTva().then((tva:any)=>{
          this.P_DT_TVA=tva;
      })
      this.menuService.getAllProduct().then(data=>this.AllProduct=data);
    }
    filterOptions(event: AutoCompleteCompleteEvent) {
      let filtered: any[] = [];
      let query = event.query;

      for (let i = 0; i < (this.sortOptions as any[]).length; i++) {
          let option = (this.sortOptions as any[])[i];
          if (option.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(option);
          }
      }

      this.FiltratedSortOptions = filtered;
  }
  panierOpen(){
      console.log("panier is opend");
      this.panierDialog=true;
      console.log(this.L_ligneCommande);
  }
    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }
    changeQte(source:string){
      if(source=="moins"&&this.quantite>0) {
          this.quantite-=1;

       }
      if(source=="plus") {
          this.quantite+=1;
      }
      setTimeout(() => {
          this.ajoutAuxPanier=this.articleCommander.prixVenteTtc*this.quantite;
      }, 3);
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }
    familleChanged( ) {
      console.log('Nouvelle valeur de codeFamille :', this.codeFamille.codeFamille);
      this.menuService.getArticleByCodeFamille(this.codeFamille.codeFamille,true).then(data =>{

        this.products = data

for (const product of this.products) {
    for (const ligne of this.L_ligneCommande) {
      if (product.codeArticle === ligne.CodeArticle) {
        product.isExist = true;
        product.quantiteCommander = ligne.Quantite;
        break; // Sortir de la boucle intérieure dès qu'une correspondance est trouvée
      }
    }
  }

      } );

     }
     cardClick(source:any){
      this.quantite=1;
      console.log("isClicked",source);
      this.articleCommander=source;
      console.log(this.articleCommander.designation);
      this.ajoutAuxPanier=this.articleCommander.prixVenteTtc;
      this.commandeByArticle=true;
     }
     AjoutauPanier(){
        for (const product of this.products) {
            if(product.codeArticle===this.articleCommander.codeArticle){
                product.isExist=true;
                product.quantiteCommander=this.quantite;
            }
        }
      let isArticleExist:boolean;
      isArticleExist=(this.L_ligneCommande.some(item=>item.CodeArticle===this.articleCommander.codeArticle))
      console.log(isArticleExist);
      if(isArticleExist){
          let ligneCommande:LigneCommandeWeb;
          let source:string;
          ligneCommande=this.L_ligneCommande.filter(item=>item.CodeArticle===this.articleCommander.codeArticle)[0];
          source=this.quantite.toString();
          this.changeQteLigne(source,ligneCommande);
          this.commandeByArticle=false;
      }

      else{
      this.utilities.calculTotalLigne(this.articleCommander.prixVenteHt,this.quantite,0,this.articleCommander.tauxTva,this.articleCommander.fodec,this.clientPassager.fodec,this.clientPassager.assujetti,this.clientPassager.exoneration,this.clientPassager.export);
      let ligneCommande:LigneCommandeWeb={} ;
          ligneCommande.CodeArticle=this.articleCommander.codeArticle;
          ligneCommande.CodeTva=this.articleCommander.codeTva;
          ligneCommande.DateCommandeWeb=new Date();
          ligneCommande.MontantFodec=this.utilities.Mt_Fodec;
          ligneCommande.Designation=this.articleCommander.designation;
          ligneCommande.Imprimer=false;
          ligneCommande.MontantHt=this.utilities.HT_Ligne
          ligneCommande.Quantite=this.quantite
          ligneCommande.Description="";
          ligneCommande.MontantRemise=this.utilities.Montant_Remise;
          ligneCommande.MontantTtc=this.utilities.TTC_Ligne;
          ligneCommande.MontantTva=this.utilities.Mnt_TVA_Ligne;
          ligneCommande.NetHt=this.utilities.Net_HT;
          ligneCommande.Etat="";
          ligneCommande.LiteTauxRemise=0;
          ligneCommande.Grammage=false;
          ligneCommande.NomUtilisateurRetour="";
          ligneCommande.NumeroOrdreRelative=-1;
          ligneCommande.NumeroOrdre=1;
          ligneCommande.PrixAchatNet=this.articleCommander.prixAchatHt;
          ligneCommande.PrixVenteHt=this.articleCommander.prixVenteHt;
          ligneCommande.CodeTypeCarte="";
          this.L_ligneCommande.push(ligneCommande);
           this.commandeByArticle=false;
           this.utilities.calculTotaux(this.P_DT_TVA,this.L_ligneCommande,true, false,this.clientPassager.assujetti);
           this.totalPanier=this.utilities.Tot_TTC;
           console.log("Total TTC",this.utilities.Tot_TTC);
           this.badgePanier=this.L_ligneCommande.length;
      }
     }
     changeQteLigne(source:string,ligneCommande:LigneCommandeWeb){
          if(source==="plus"){
              ligneCommande.Quantite+=1
              this.quantite=ligneCommande.Quantite ;
          }
          else if(source==="moins"){
              ligneCommande.Quantite-=1;
              this.quantite=ligneCommande.Quantite ;

                        }
          else{
              this.quantite=this.quantite+ligneCommande.Quantite;
          }
           if (ligneCommande.Quantite === 0) {
                          const indexToRemove = this.L_ligneCommande.indexOf(ligneCommande);
                          if (indexToRemove !== -1) {
                            this.L_ligneCommande.splice(indexToRemove, 1);
                            this.badgePanier=this.L_ligneCommande.length;
                            for (const product of this.products) {

                                if(product.codeArticle===ligneCommande.CodeArticle){
                                    product.isExist=false;
                                    product.quantiteCommander=0;
                                }
                                 }
                          }
                        }
          for (const product of this.products) {

            if(product.codeArticle===ligneCommande.CodeArticle){
                product.isExist=true;
                product.quantiteCommander=this.quantite;
            }
             }

              console.log(this.AllProduct);

          this.articleCommander=this.AllProduct.filter(item=>item.codeArticle===ligneCommande.CodeArticle)[0];
          this.utilities.calculTotalLigne(this.articleCommander.prixVenteHt,this.quantite,0,this.articleCommander.tauxTva,this.articleCommander.fodec,this.clientPassager.fodec,this.clientPassager.assujetti,this.clientPassager.exoneration,this.clientPassager.export);
          ligneCommande.PrixAchatNet=this.articleCommander.prixAchatHt;
          ligneCommande.PrixVenteHt=this.articleCommander.prixVenteHt;
          ligneCommande.MontantRemise=this.utilities.Montant_Remise;
          ligneCommande.MontantTtc=this.utilities.TTC_Ligne;
          ligneCommande.MontantTva=this.utilities.Mnt_TVA_Ligne;
          ligneCommande.NetHt=this.utilities.Net_HT;
          ligneCommande.MontantHt=this.utilities.HT_Ligne;
          ligneCommande.Quantite=this.quantite;
          ligneCommande.MontantFodec=this.utilities.Mt_Fodec;
          this.utilities.calculTotaux(this.P_DT_TVA,this.L_ligneCommande,true, false,this.clientPassager.assujetti);
          console.log("Total TTC",this.utilities.Tot_TTC);
          this.totalPanier=this.utilities.Tot_TTC;



     }
     commander(){
        this.utilities.calculTotaux(this.P_DT_TVA,this.L_ligneCommande,true, false,this.clientPassager.assujetti);
        console.log(this.clientPassager);

        this.commandeWeb.codeClient=this.clientPassager.codeClient;
        this.commandeWeb.dateCommande=new Date();
        this.commandeWeb.nombrePax=0;
        this.commandeWeb.numeroTable=this.numeroTable;
        this.commandeWeb.nomUtilisateur="SADOK";
        this.commandeWeb.totalFodec=this.utilities.Tot_Fodec;
        this.commandeWeb.totalHt=this.utilities.Tot_HT;
        this.commandeWeb.totalNetHt=this.utilities.Tot_NET_HT;
        this.commandeWeb.totalRemise=this.utilities.Tot_Remise;
        this.commandeWeb.totalTtc=this.utilities.Tot_TTC;
        this.commandeWeb.totalTva=this.utilities.Taux_TVA;
        this.commandeWeb.LISTE=this.L_ligneCommande;
        this.menuService.addCommande(this.commandeWeb).then((res)=>{
        console.log(res);
        })
        this.service.add({ key: 'commandSuccess', severity: 'success', summary: 'Success Message', detail: 'Votre Commande est passé avec succés' });
        this.L_ligneCommande=[];
        this.commandeWeb=undefined;
        this.menuService.getArticleByCodeFamille(this.codeFamille.codeFamille,true).then(data =>{
        this.products = data});
        this.panierDialog=false;
        this.totalPanier=0;
        this.quantite=1;
        this.badgePanier=0;
    }
  }


