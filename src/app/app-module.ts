import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { FooterComponent } from './footer/footer.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeadersInterceptor } from './interceptors/headers.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../environments/environment.development';

import { RecipesComponent } from './recipes/recipes.component';
import { AllreciperesultsComponent } from './recipes/allreciperesults/allreciperesults.component';
import { RecipedetailsComponent } from './recipes/recipedetails/recipedetails.component';
import { ReciperesultsComponent } from './recipes/reciperesults/reciperesults.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { IngredientsComponent } from './ingredients/ingredients.component';
import { IngredientdetailsComponent } from './ingredients/ingredientdetails/ingredientdetails.component';
import { IngredientresultsComponent } from './ingredients/ingredientresults/ingredientresults.component';
import { AllingredientresultsComponent } from './ingredients/allingredientresults/allingredientresults.component';

@NgModule({
  declarations: [App, FooterComponent, PagenotfoundComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    HttpClientModule,

    SweetAlert2Module,
    FontAwesomeModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [App],
})
export class AppModule {}
