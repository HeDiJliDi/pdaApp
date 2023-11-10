import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { Utilities } from '../Utilities';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';


@NgModule({
    imports: [
        DashboardsRoutingModule,
        CommonModule,
		FormsModule,
		DataViewModule,
		PickListModule,
		OrderListModule,
		InputTextModule,
		DropdownModule,
		RatingModule,
        AutoCompleteModule,
		ButtonModule,
        DialogModule,
        AccordionModule,
        MessageModule,
        MessagesModule,
        ToastModule,
        BadgeModule



    ],
    declarations: [DashboardComponent],
    providers:[Utilities,MessageService
    ],
})
export class DashboardModule { }
