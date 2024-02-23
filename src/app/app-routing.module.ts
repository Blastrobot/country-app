import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";

import { AboutPageComponent } from "./shared/pages/about-page/about-page.component";
import { ContactPageComponent } from "./shared/pages/contact-page/contact-page.component";
import { HomePageComponent } from "./shared/pages/home-page/home-page.component";

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'about',
        component: AboutPageComponent
    },
    {
        path: 'contact',
        component: ContactPageComponent 
    },
    {
        path: 'countries',
        // component: AboutPageComponent
        loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot( routes ),
    ],
    exports: [
        RouterModule
    ],
    providers: [],
})
export class AppRoutingModule {}