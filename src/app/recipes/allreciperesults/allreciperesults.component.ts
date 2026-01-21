import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { RecipesService } from 'src/app/services/recipes.service';

import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-allreciperesults',
  standalone: false,
  templateUrl: './allreciperesults.component.html',
  styleUrls: ['./allreciperesults.component.scss'],
})
export class AllreciperesultsComponent {
  searchResult: any = {};
  results: boolean = false;
  query: string = '';

  progressBar: boolean = false;

  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.progressBar = true;
    this.route.queryParams.subscribe((params) => {
      this.query = params['query'];
      this.recipeService.getRecipeSearch(params['query'], params['number']).subscribe((data) => {
        this.searchResult = data;
        this.results = true;
        this.progressBar = false;
        this.cdr.detectChanges();
      });
    });
    //this.cdr.detectChanges();
  }

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 12,
    currentPage: 1,
  };
}
