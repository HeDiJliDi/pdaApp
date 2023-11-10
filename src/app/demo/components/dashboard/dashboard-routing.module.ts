import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: ':param1', component: DashboardComponent },
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
