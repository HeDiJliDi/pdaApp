import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.services';
interface Item {
    id?: number;
    name?: string;
   }
   interface StockDepotItems {
    id?: number;
    name?: string;
    local?:boolean;
   }
@Component({
  selector: 'app-look-up-edit-article',
  templateUrl: './look-up-edit-article.component.html',
  styleUrls: ['./look-up-edit-article.component.scss']
})
export class LookUpEditArticleComponent implements OnInit{

    isEditing=false;
        items: Item[] = [];
        ArticleDialog=false;
        mode:string="Ajout";
        @Output() sourceUpdated:EventEmitter<string>=new EventEmitter<string>();

        @Output() articleUpdated: EventEmitter<Article> = new EventEmitter<Article>();
        @Output() codeUpdated: EventEmitter<string> = new EventEmitter<string>();

        @Input() source:string="";
        @Input() newCodeFamille:string="";

        @Input() title:string="";
        @Input() label:string="";
        @Input() codeFamille: any | undefined;
        UniteArticlesItem:Item[]=[];
        @Input() defaultMarqueArticle:Item[]=[] ;
        DepotsItem:Item[]=[];
        TypeArticlesItem:Item[]=[];
        MarqueArticlesItem:Item[]=[];
        selectedItem!: Item;
        modeFournisseur:string="";
        article:Article={};
        AddModifyFournisseurDialog=false;
        displayDialogSousFamilleArticle=false;
        displayDialogueResponsable=false;
        displayDialogueRetenuSource=false;
        displayDialogFamille=false;
        displayDialogsecteurActivite=false;
        displayDialogville=false;
        displayDialogdevise=false;
        displayDialogpays=false;
        displayDialogsousRegion=false;
        displayDialogmodeReglement=false;
        displayDialogueFonctionContacts=false;
        sousFamilleArticleItems:Item[]=[];
        searchTerm: string = '';
        newCar = {
            id: '',
            name:''
          };
          field:string="name";
          DepotStockItem:StockDepotItems[]=[];

        //   selectedItem: Item | null = null;

          filteredItems: any[] = [];

          constructor(private articleService: ArticleService) {}

          ngOnInit(): void {
            if(this.source==="familleArticle"){
                this.articleService.getNewCodeFamille().then((code:any)=>{
                    this.newCodeFamille=code;
                    this.newCar.id=this.newCodeFamille;

               });
            }
            console.log("newwwwwww",this.newCodeFamille);

            // this.article.codeFamille=this.defaultMarqueArticle;
            if(this.source=="depotAchatStock"){
                this.field="id";
            }

            console.log("ddd",this.defaultMarqueArticle);


              this.articleService.getFamilleArticleLook().then((famille:any)=>{
                  this.items=famille as Item[];

               });


              this.articleService.getMarqueArticlesLook().then((famille:any)=>{
                this.MarqueArticlesItem=famille as Item[];
                if(this.source==="marqueArticle"){
                    this.MarqueArticlesItem=famille ;
                   const query="aucun"
                   this.article.codeFamille=famille.filter(item => item.name?.toLowerCase()===(query.toLowerCase()))[0];
                   this.selectedItem=famille.filter(item => item.name?.toLowerCase()===(query.toLowerCase()))[0];


           }
                this.articleService.getDepotsStockLook().then((items:any)=>{

                    this.DepotStockItem=items as  StockDepotItems[];
                })

             });

            this.articleService.getTypeArticlesLook().then((famille:any)=>{
                this.TypeArticlesItem=famille as Item[];
                if(this.source==="typeArticle"){
                    const query="pf";
                    this.article.codeFamille=famille.filter(item => item.id?.toLowerCase()===(query.toLowerCase()))[0];
                    this.selectedItem=famille.filter(item => item.id?.toLowerCase()===(query.toLowerCase()))[0];
                }
             });

            this.articleService.getDepotsLook().then((famille:any)=>{
                this.DepotsItem=famille as Item[];
             });

            this.articleService.geUniteArticlesLook().then((famille:any)=>{
                this.UniteArticlesItem=famille as Item[];
                if(this.source==="unite"){
                    const query="p";
                    this.article.codeFamille=famille.filter(item => item.id?.toLowerCase()===(query.toLowerCase()))[0];
                    this.selectedItem=famille.filter(item => item.id?.toLowerCase()===(query.toLowerCase()))[0];
                }
             });

             console.log(this.defaultMarqueArticle);




          }


          onRowSelect(event: any,) {
            console.log(this.selectedItem);
            this.handleSingleClickFournisseur(this.selectedItem,this.source)
          }

          emitUpdatedArticle(source:string) {
            this.sourceUpdated.emit(source);
            this.articleUpdated.emit(this.article);

          }
          searchItems(event: any,source:string) {

              const query = event.query;
                if(source=="familleArticle"){this.filteredItems = this.items.filter(item => item.name?.toLowerCase().includes(query.toLowerCase())) }
                else if(source==="sousFamilleArticle"){ this.filteredItems = this.sousFamilleArticleItems.filter(item => item.name?.toLowerCase().includes(query.toLowerCase()))}
                else if(source==="marqueArticle"){this.filteredItems=this.MarqueArticlesItem.filter(item => item.name?.toLowerCase().includes(query.toLowerCase()))}
                else if(source==="typeArticle"){this.filteredItems=this.TypeArticlesItem.filter(item => item.name?.toLowerCase().includes(query.toLowerCase()))}
                else if(source==="depotAchat"){this.filteredItems=this.DepotsItem.filter(item => item.name?.toLowerCase().includes(query.toLowerCase()))}
                else if(source==="unite"){this.filteredItems=this.UniteArticlesItem.filter(item => item.name?.toLowerCase().includes(query.toLowerCase()))}
                else if(source==="depotAchatStock"){this.filteredItems=this.DepotStockItem.filter(item => item.name?.toLowerCase().includes(query.toLowerCase()));}

            }
            showDetails(source:string)
            {
                  if(source=="familleArticle"){this.filteredItems = this.items;this.displayDialogFamille=true}
                  else if(source==="sousFamilleArticle"){ this.filteredItems = this.sousFamilleArticleItems;this.displayDialogSousFamilleArticle=true;}
                  else if(source==="marqueArticle"){this.filteredItems=this.MarqueArticlesItem;this.displayDialogSousFamilleArticle=true;}
                  else if(source==="typeArticle"){this.filteredItems=this.TypeArticlesItem;this.displayDialogSousFamilleArticle=true;}
                  else if(source==="depotAchat"){this.filteredItems=this.DepotsItem;this.displayDialogSousFamilleArticle=true;}
                  else if(source==="depotAchatStock"){this.filteredItems=this.DepotStockItem;this.displayDialogSousFamilleArticle=true;}
                  else if(source==="unite"){this.filteredItems=this.UniteArticlesItem;this.displayDialogSousFamilleArticle=true;}

          }

          cancel(){}
          validateInput() {

              if (typeof this.selectedItem === 'object' && this.selectedItem?.name) {
                  const exists = this.filteredItems.some(item => item.name === this.selectedItem?.name);

                  if (!exists) {
                      this.selectedItem = null;
                  }
              } else {
                   this.selectedItem = null;
              }
            }
            newItem() {
              this.isEditing = false;
              this.modeFournisseur="new"
              this.newCar = { id: '', name: '' };
              this.AddModifyFournisseurDialog=true;

            }
            fermerLookUp(){

                this.displayDialogFamille=false;
                this.displayDialogSousFamilleArticle=false;
            }
            saveCar() {
            //   this.saveCarSer(this.newCar).subscribe((data:any) => {
            //     this.displayDialog=false;
            //     this.getVoituresC();
            //     this.displayDialog=true;
            //     this.AddModifyFournisseurDialog=false;
            //   });
            }

            updateItem() {
              // this.modeFournisseur="edit"
              // this.newCar = {
              //   id: this.selectedItem?.id?.toString() ?? '',
              //   name: this.selectedItem?.name ?? ''
              // };
              // this.isEditing = true;
              // this.AddModifyFournisseurDialog=true;

            }
            handleDoubleClickFournisseur(){
                console.log("nnnn");

              this.displayDialogFamille=false;
              this.displayDialogSousFamilleArticle=false;
              // this.displayDialogville=false;
              // this.displayDialogdevise=false;
              // this.displayDialogpays=false;
              // this.displayDialogsousRegion=false;
              // this.displayDialogBanque=false;
              // this.displayDialogmodeReglement=false;
              // this.displayDialogueRetenuSource=false;
              // this.displayDialogueResponsable=false;
              // this.displayDialogueFonctionContacts=false;





            }
            lastClickTime: number = 0;
            handleSingleClickFournisseur(item: any,source:string) {
              console.log(source);
                const currentTime = new Date().getTime();
                const timeDiff = currentTime - this.lastClickTime;
                if (timeDiff < 250) {  // if the two clicks are less than 250ms apart
                    this.handleDoubleClickFournisseur();
                    return;
                }
                this.lastClickTime = currentTime;
                // Delay the single click action
                setTimeout(() => {
                      if (new Date().getTime() - this.lastClickTime > 250)
                   {
                      if(source==="familleArticle"){this.article.codeFamille = item;this.emitUpdatedArticle(source); }
                      if(source==="unite"){this.article.codeFamille = item;this.emitUpdatedArticle(source); }
                      if(source==="typeArticle"){this.article.codeFamille = item;this.emitUpdatedArticle(source); }
                      if(source==="marqueArticle"){this.article.codeFamille = item;this.emitUpdatedArticle(source); }
                      if(source==="depotAchat"){this.article.codeFamille = item;this.emitUpdatedArticle(source); }
                      if(source==="depotAchatStock"){this.article.codeFamille = item;this.emitUpdatedArticle(source); }

                   }
                }, 250);
            }
            filterItems() {
              console.log(this.selectedItem);

                if (this.searchTerm) {
                    this.filteredItems = this.items.filter(item => item.name?.toLowerCase().includes(this.searchTerm.toLowerCase()));
                } else {
                    this.filteredItems = [...this.items];
                }
            }
            Add(){
                console.log("ajouter");

                  this.AddModifyFournisseurDialog=true;
              }
}
