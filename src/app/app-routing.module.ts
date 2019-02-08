import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {GiftComponent} from './gift/gift.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import {NewUserComponent} from './new-user/new-user.component';
import {AppComponent} from './app.component';
import {CatalogueComponent} from './catalogue/catalogue.component';


const routes: Routes = [
  { path: 'main', component: MainComponent},
  { path: 'schedule',component: ScheduleComponent},
  { path: 'gift',component: GiftComponent},
  { path: 'admin',component: AdminComponent},
  { path: 'login',component: LoginComponent},
  { path: 'newuser',component: NewUserComponent},
  { path: 'catalogue',component: CatalogueComponent},
  { path: 'start',component: AppComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
