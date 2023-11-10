// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { ArticleVF } from 'src/app/models/ArticleVf';
// import { ArticleService } from '../../service/article.service';
// import { FournisseurService } from '../../service/fournisseur.service';
// import { Client2Service } from '../../service/client2.service';
// interface Item {
//     id?: number;
//     name?: string;
//    }
// @Component({
//   selector: 'app-look-upedit',
//   templateUrl: './look-upedit.component.html',
//   styleUrls: ['./look-upedit.component.scss']
// })

// export class LookUPEditComponent implements OnInit{
//     isEditing=false;
//     items: Item[] = [];
//     ArticleDialog=false;
//     mode:string="Ajout";
//     @Output() sourceUpdated:EventEmitter<string>=new EventEmitter<string>();
//     @Output() articleUpdated: EventEmitter<ArticleVF> = new EventEmitter<ArticleVF>();
//     @Input() source:string="";
//     @Input() title:string="";
//     @Input() label:string="";

//     modeFournisseur:string="";
//     article:ArticleVF={};
//     AddModifyFournisseurDialog=false;
//     displayDialogSousFamilleArticle=false;
//     displayDialogueResponsable=false;
//     displayDialogueRetenuSource=false;
//     displayDialogFamille=false;
//     displayDialogsecteurActivite=false;
//     displayDialogville=false;
//     displayDialogdevise=false;
//     displayDialogpays=false;
//     displayDialogsousRegion=false;
//     displayDialogmodeReglement=false;
//     displayDialogueFonctionContacts=false;
//     sousFamilleArticleItems:Item[]=[];
//     searchTerm: string = '';
//     newCar = {
//         id: '',
//         name:''
//       };

//       selectedItem: Item | null = null;

//       filteredItems: Item[] = [];

//       constructor(private articleService: ArticleService,private fournisseurService: FournisseurService,private client2Service:Client2Service,) {}

//       ngOnInit(): void {
//         console.log("cccccccc",this.source);

//           this.fournisseurService.getFamilleFournisseurLook().then((famille:any)=>{
//               this.items=famille as Item[];
//           });
//       }
//       emitUpdatedArticle(source:string) {
//         this.sourceUpdated.emit(source);
//         this.articleUpdated.emit(this.article);
//       }
//       searchItems(event: any,source:string) {

//           const query = event.query;
//             if(source=="familleArticle"){this.filteredItems = this.items.filter(item => item.name?.toLowerCase().includes(query.toLowerCase())) }
//              else if(source==="SousFamilleArticle"){ this.filteredItems = this.sousFamilleArticleItems.filter(item => item.name?.toLowerCase().includes(query.toLowerCase()));}
//           //   else if(source==="ville"){ this.filteredItems = this.VillesItems.filter(item => item.name?.toLowerCase().includes(query.toLowerCase()));}
//           //   else if(source==="devise"){ this.filteredItems = this.DeviseItems.filter(item => item.name?.toLowerCase().includes(query.toLowerCase()));}
//           //   else if(source==="pays"){ this.filteredItems = this.PaysItems.filter(item => item.name?.toLowerCase().includes(query.toLowerCase()));}
//           //   else if(source==="sousRegion"){ this.filteredItems = this.SousRegionsItems.filter(item => item.name?.toLowerCase().includes(query.toLowerCase()));}
//           //   else if(source==="banque"){ this.filteredItems = this.banqueItems.filter(item => item.name?.toLowerCase().includes(query.toLowerCase()));}
//           //   else if(source==="modeReglement"){ this.filteredItems = this.modeReglementItems.filter(item => item.name?.toLowerCase().includes(query.toLowerCase()));}
//           //   else if(source==="retenuSource"){ this.filteredItems = this.retenuSourcesItem.filter(item => item.name?.toLowerCase().includes(query.toLowerCase()));}
//           //   else if(source==="responsable"){ this.filtredItemsResponsable = this.ResponsableItem.filter(item => item.nomPrenom?.toLowerCase().includes(query.toLowerCase()));}
//           //   else if(source==="fonctionContact"){ this.filteredItems = this.fonctionContactsItems.filter(item => item.name?.toLowerCase().includes(query.toLowerCase()));}




//         }
//         showDetails(source:string)
//         {
//       //         console.log(source);
//               if(source=="familleArticle"){this.filteredItems = this.items;this.displayDialogFamille=true}
//               else if(source==="sousFamilleArticle"){ this.filteredItems = this.sousFamilleArticleItems;this.displayDialogSousFamilleArticle=true;}
//       //         else if(source==="ville"){ this.filteredItems = this.VillesItems;this.displayDialogville=true}
//       //         else if(source==="devise"){ this.filteredItems = this.DeviseItems;this.displayDialogdevise=true}
//       //         else if(source==="pays"){ this.filteredItems = this.PaysItems;this.displayDialogpays=true}
//       //         else if(source==="sousRegion"){ this.filteredItems = this.SousRegionsItems;this.displayDialogsousRegion=true}
//       //         else if(source==="banque"){ this.filteredItems = this.banqueItems;this.displayDialogBanque=true}
//       //         else if(source==="modeReglement"){ this.filteredItems = this.modeReglementItems;this.displayDialogmodeReglement=true}
//       //         else if(source==="retenuSource"){ this.filteredItems = this.retenuSourcesItem;this.displayDialogueRetenuSource=true}
//       //         else if(source==="responsable"){ this.filtredItemsResponsable = this.ResponsableItem;this.displayDialogueResponsable=true}
//       //         else if(source==="fonctionContact"){ this.filteredItems = this.fonctionContactsItems;this.displayDialogueFonctionContacts=true}
//         }
//       Ajouter(){
//           this.ArticleDialog=true;
//       }
//       cancel(){}
//       validateInput() {

//           if (typeof this.selectedItem === 'object' && this.selectedItem?.name) {
//               const exists = this.filteredItems.some(item => item.name === this.selectedItem?.name);

//               if (!exists) {
//                   this.selectedItem = null;
//               }
//           } else {
//                this.selectedItem = null;
//           }
//         }
//         newItem() {
//           this.isEditing = false;
//           this.modeFournisseur="new"
//           this.newCar = { id: '', name: '' };
//           this.AddModifyFournisseurDialog=true;

//         }
//         saveCar() {
//           // this.saveCarSer(this.newCar).subscribe((data:any) => {
//           //   this.displayDialog=false;
//           //   this.getVoituresC();
//           //   this.displayDialog=true;
//           //   this.AddModifyFournisseurDialog=false;
//           // });
//         }

//         updateItem() {
//           // this.modeFournisseur="edit"
//           // this.newCar = {
//           //   id: this.selectedItem?.id?.toString() ?? '',
//           //   name: this.selectedItem?.name ?? ''
//           // };
//           // this.isEditing = true;
//           // this.AddModifyFournisseurDialog=true;

//         }
//         handleDoubleClickFournisseur(){
//           this.displayDialogFamille=false;
//           this.displayDialogSousFamilleArticle=false;
//           // this.displayDialogville=false;
//           // this.displayDialogdevise=false;
//           // this.displayDialogpays=false;
//           // this.displayDialogsousRegion=false;
//           // this.displayDialogBanque=false;
//           // this.displayDialogmodeReglement=false;
//           // this.displayDialogueRetenuSource=false;
//           // this.displayDialogueResponsable=false;
//           // this.displayDialogueFonctionContacts=false;





//         }
//         lastClickTime: number = 0;
//         handleSingleClickFournisseur(item: any,source:string) {
//           console.log(source);
//             const currentTime = new Date().getTime();
//             const timeDiff = currentTime - this.lastClickTime;
//             if (timeDiff < 250) {  // if the two clicks are less than 250ms apart
//                 this.handleDoubleClickFournisseur();
//                 return;
//             }
//             this.lastClickTime = currentTime;
//             // Delay the single click action
//             setTimeout(() => {
//                   if (new Date().getTime() - this.lastClickTime > 250) {
//                   if(source==="familleArticle"){this.article.codeFamilleArticle = item;this.emitUpdatedArticle(source);}
//                   else if(source==="sousFamilleArticle"){ this.article.codeSousFamilleArticle = item;this.emitUpdatedArticle(source)}
//               //     else if(source==="ville"){ this.fournisseurVf.codeVille = item}
//               //     else if(source==="devise"){ this.fournisseurVf.codeDevise =item}
//               //     else if(source==="pays"){ this.fournisseurVf.codePays = item}
//               //     else if(source==="sousRegion"){ this.fournisseurVf.codeSousRegion = item}
//               //     else if(source==="banque"){ this.fournisseurBanque[this.fournisseurBanque.length - 1].codeBanque = item}
//               //     else if(source==="garentie"){ this.fournisseurGarantie[this.fournisseurGarantie.length - 1].codeBanque = item}
//               //     else if(source==="modeReglement"){ this.fournisseurGarantie[this.fournisseurGarantie.length - 1].codeModeReglement = item}
//               //     else if(source==="villeGarentie"){ this.fournisseurGarantie[this.fournisseurGarantie.length - 1].ville= item}
//               //     else if(source==="ConventionmodeReglement"){ this.fournisseurConvention[this.fournisseurConvention.length - 1].codeModeReglement= item}
//               //     else if(source==="retenuSource"){ this.fournisseurConvention[this.fournisseurConvention.length - 1].codeRetenuSource= item}
//               //     else if(source==="responsable"){ this.fournisseurResponsableVf[this.fournisseurResponsableVf.length - 1].codeResponsable1= item;this.fournisseurResponsableVf[this.fournisseurResponsableVf.length - 1].codeTypeResponsable1=item.typeResponsable}
//               //     else if(source==="responsable2"){ this.fournisseurResponsableVf[this.fournisseurResponsableVf.length - 1].codeResponsable2= item;this.fournisseurResponsableVf[this.fournisseurResponsableVf.length - 1].codeTypeResponsable2=item.typeResponsable}
//               //     else if(source==="responsable3"){ this.fournisseurResponsableVf[this.fournisseurResponsableVf.length - 1].codeResponsable3= item;this.fournisseurResponsableVf[this.fournisseurResponsableVf.length - 1].codeTypeResponsable3=item.typeResponsable}
//               //     else if(source==="fonctionContact"){ this.fournisseurContactVF[this.fournisseurContactVF.length - 1].codeFonctionContact= item;}
//                }
//             }, 250);
//         }
//         filterItems() {
//           console.log(this.selectedItem);

//             if (this.searchTerm) {
//                 this.filteredItems = this.items.filter(item => item.name?.toLowerCase().includes(this.searchTerm.toLowerCase()));
//             } else {
//                 this.filteredItems = [...this.items];
//             }
//         }

//   }

