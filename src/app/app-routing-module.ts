import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipedetailsComponent } from './recipes/recipedetails/recipedetails.component';
import { AllingredientresultsComponent } from './ingredients/allingredientresults/allingredientresults.component';
import { IngredientdetailsComponent } from './ingredients/ingredientdetails/ingredientdetails.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { AllreciperesultsComponent } from './recipes/allreciperesults/allreciperesults.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'recipes' },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
  },

  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then((recipe) => recipe.RecipesModule),
  },
  {
    path: 'ingredients',
    loadChildren: () =>
      import('./ingredients/ingredients.module').then((ingredient) => ingredient.IngredientsModule),
  },

  {
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
