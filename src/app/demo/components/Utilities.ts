import { ArticleService } from "src/app/services/article.services";
import { Injectable } from '@angular/core';
import { MenuServicce } from "src/app/services/menu.services";
interface RecapTVAItem {
    CodeTVA: string;
    BaseHT: number;
    TauxTVA: number;
    MontantTVA: number;
  }
@Injectable()
export class Utilities{
    constructor(private menuService:MenuServicce){}
    Net_HT:number=0;
    TTC_Ligne:number=0;
    HT_Ligne: number = 0;
    Mnt_Remise: number = 0;
    Mt_Fodec: number = 0;
    Assete: number = 0;
    Mnt_TVA_Ligne: number = 0;
    Taux_Fodec:number=0;
    TauxMajoration:number=0;
    Base_HT: number = 0;
    Montant_TVA: number = 0;
    Taux_TVA: number = 0;
    Montant_Remise: number = 0;
    Tot_TTC: number = 0;
    Tot_HT: number = 0;
    Tot_Remise: number = 0;
    Tot_NET_HT: number = 0;
    Tot_Fodec: number = 0;
    Tot_TVA: number = 0;
    TimbreFiscal: number = 0;
    DT_RecapTVA: RecapTVAItem[] = [];
     calculTotalLigne(
        P_PrixHT: number,
        P_Qt: number,
        P_TauxRemise: number,
        P_TauxTVA: number,
        P_Fodec: boolean,
        P_Tier_Fodec: boolean,
        P_Majorer: boolean,
        P_Exoner: boolean,
        P_Export: boolean
      ): void {

        this.menuService.getPaarametreDiversTaux().then((taux:any)=>{
            this.Taux_Fodec=taux[0].tauxFodec;
            this.TauxMajoration=taux[0].tauxMajoration;
        })

        this.HT_Ligne = this.roundSQL(P_PrixHT * P_Qt, 5);
        this.Mnt_Remise = this.roundSQL(   this.HT_Ligne * (P_TauxRemise / 100), 5);
        this.Net_HT = this.roundSQL(   this.HT_Ligne -    this.Mnt_Remise, 5);

        if (P_Fodec && P_Tier_Fodec) {
          this.Mt_Fodec = this.roundSQL(this.Net_HT *    this.Taux_Fodec, 5);
        }

        this.Assete = this.roundSQL(this.Net_HT +    this.Mt_Fodec, 5);

        if (P_Exoner || P_Export) {
          this.Mnt_TVA_Ligne = this.roundSQL(   this.Assete * 0, 5);
        } else {
          if (!P_Majorer) {
            P_TauxTVA = P_TauxTVA * (1 +    this.TauxMajoration);
            this.Mnt_TVA_Ligne = this.roundSQL(   this.Assete * (P_TauxTVA / 100), 5);
          } else {
            this.Mnt_TVA_Ligne = this.roundSQL(   this.Assete * (P_TauxTVA / 100), 5);
          }
        }

        this.TTC_Ligne = this.roundSQL(   this.Assete +    this.Mnt_TVA_Ligne,6);
        console.log(   this.TTC_Ligne);

      }

       roundSQL(value: number, decimals: number): number {
        const multiplier = Math.pow(10, decimals);
        return Math.round(value * multiplier) / multiplier;
      }

      calculTotaux(
        P_DT_TVA: any[],
        P_DT_Ligne: any[],
        P_RemiseFodec: boolean,
        P_Timbre: boolean,
        P_Majorer: boolean
      ): void {

        this.DT_RecapTVA=[];
        this.Tot_TTC = 0;
        this.Tot_HT  =0;
        this.Tot_Remise = 0;
        this.Tot_NET_HT = 0;
        this.Tot_Fodec= 0;
        this.Tot_TVA = 0;
        this.TimbreFiscal = 0;
        this.menuService.getPaarametreDiversTaux().then((taux:any)=>{
            this.Taux_Fodec=taux[0].tauxFodec;
            this.TauxMajoration=taux[0].tauxMajoration;
            this.TimbreFiscal=taux[0].timbreFiscal
        })



        try {
          for (const DR_TVA of P_DT_TVA ) {

            this.Base_HT =0;
            this.Montant_TVA=0;
            for (const Ligne of P_DT_Ligne ) {
              if (Ligne["CodeArticle"].toString() !== "") {

                // const Cl_Article: Article = new Article();
                // Cl_Article.CodeArticle = Ligne["CodeArticle"].toString();
                // Cl_Article.obtenirInstanceArticle(Cl_Article);
                // let codeTva:string;
                // this.articleService.getCodeTvaByArticle(Ligne["codeArticle"].toString()).then((tva:any)=>{
                //     codeTva=tva.codeTva;
                // })
                if (DR_TVA["codeTva"].toString() === Ligne["CodeTva"].toString()) {
                  if (P_RemiseFodec) {
                    this.Base_HT = this.roundSQL(
                        this.Base_HT +
                        parseFloat(Ligne["NetHt"].toString()) +
                        parseFloat(Ligne["MontantFodec"].toString()),
                      3
                    );
                  } else {
                    this.Base_HT = this.roundSQL(
                        this.Base_HT + parseFloat(Ligne["MontantHt"].toString()),
                      3
                    );
                  }

                  this.Tot_HT = this.roundSQL(
                    this.Tot_HT + parseFloat(Ligne["MontantHt"].toString()),
                    3
                  );

                  this.Montant_TVA = this.roundSQL(
                    this.Montant_TVA + parseFloat(Ligne["MontantTva"].toString()),
                    3
                  );

                  if (P_RemiseFodec) {
                    this.Tot_Remise = this.roundSQL(
                        this.Tot_Remise + parseFloat(Ligne["MontantRemise"].toString()),
                      3
                    );

                    this.Tot_NET_HT = this.roundSQL(
                        this.Tot_NET_HT + parseFloat(Ligne["NetHt"].toString()),
                      3
                    );

                    this.Tot_Fodec = this.roundSQL(
                        this.Tot_Fodec + parseFloat(Ligne["MontantFodec"].toString()),
                      3
                    );
                  }
                }
              }
            }

            let myRow : RecapTVAItem={
                CodeTVA:"",
                BaseHT: 0,
                TauxTVA: 0,
                MontantTVA: 0,
            };
            myRow.CodeTVA = DR_TVA["codeTva"].toString();
            myRow.BaseHT  = this.Base_HT ;

            if (!P_Majorer) {
              myRow.TauxTVA = (
                 DR_TVA["tauxTva"] ) *
                (1 +  this.TauxMajoration / 100)
               ;
            } else {
              myRow.TauxTVA = DR_TVA["tauxTva"] ;
            }

            myRow.MontantTVA= this.Montant_TVA ;

            this.DT_RecapTVA.push(myRow);

            this.Tot_TVA = this.roundSQL( this.Tot_TVA + this.Montant_TVA, 3);

            if (P_RemiseFodec) {
                this.Tot_Remise = this.roundSQL( this.Tot_Remise + this.Montant_Remise, 3);
                this.Tot_TTC = this.roundSQL(
                    this.Tot_HT -  this.Tot_Remise +  this.Tot_TVA +  this.Tot_Fodec,
                3
              );
            } else {
                this.Tot_TTC = this.roundSQL( this.Tot_HT +  this.Tot_TVA, 3);
            }
          }

          if (P_Timbre) {
            this.Tot_TTC = this.roundSQL( this.Tot_TTC +  this.TimbreFiscal, 3);
          }
        } catch (error) {
          // Gérer les exceptions ici
        }
      }





}
