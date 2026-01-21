import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: false,
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesComponent {
  searchQuery: string = '';
  searchResults: any = {};
  queryNumber: number = 12; //12
  results: boolean = false;
  progressBar: boolean = false;
  query: string = '';

  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    this.results = false;
  }

  getRecipe() {
    this.progressBar = true;
    this.query = this.searchQuery;
    console.log('query: ' + this.query);

    this.recipeService.getRecipeSearch(this.searchQuery, this.queryNumber).subscribe((data) => {
      this.searchResults = data;
      this.results = true;
      this.progressBar = false;
      this.cdr.detectChanges();
    });
    //this.cdr.detectChanges();
  }

  seeAllResults() {
    this.router.navigate(['recipes/allreciperesults'], {
      queryParams: {
        query: this.searchQuery,
        number: this.searchResults.totalResults,
      },
    });
  }
}
