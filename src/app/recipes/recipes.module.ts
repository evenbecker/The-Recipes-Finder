import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { AllreciperesultsComponent } from './allreciperesults/allreciperesults.component';
import { RecipedetailsComponent } from './recipedetails/recipedetails.component';
import { ReciperesultsComponent } from './reciperesults/reciperesults.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

@NgModule({
  declarations: [
    RecipesComponent,
    AllreciperesultsComponent,
    RecipedetailsComponent,
    ReciperesultsComponent,
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgxPaginationModule,
  ],
  providers: [provideCharts(withDefaultRegisterables())],
})
export class RecipesModule {}
