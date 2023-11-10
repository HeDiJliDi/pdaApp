import { LigneCommandeWeb } from "./ligneCommandeWeb";

export interface CommandeWeb {
    numeroCommandeWeb?: string;
    numeroTable?: string;
    nomUtilisateur?: string;
    numeroBonLivraisonVente?: string;
    numeroSession?: string;
    totalHt?: number;
    totalRemise?: number;
    totalFodec?: number;
    totalNetHt?: number;
    totalTva?: number;
    totalTtc?: number;
    codeClient?: string;
    dateCommande?: Date;
    codeDepot?: string;
    nombrePax?: number;
    LISTE?: LigneCommandeWeb[];
  }
