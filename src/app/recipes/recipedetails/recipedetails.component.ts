import { ChangeDetectorRef, Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-recipedetails',
  standalone: false,
  templateUrl: './recipedetails.component.html',
  styleUrls: ['./recipedetails.component.scss'],
})
export class RecipedetailsComponent {
  recipeDetail: any = {};
  summary: SafeHtml = '';
  instructions: SafeHtml = '';
  tasteDetails: any = {};
  extendedInstruction: boolean = false;
  analyzedInstructions: any = [];
  equipmentDetails: any = {};
  tasteArray: any = [];

  wineParingName: string = '';
  wineParingDescription: any = {};

  loading: boolean = false;

  faCheck = faCheck;
  faMinus = faMinus;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loading = true;
    const id: any = this.route.snapshot.paramMap.get('id');
    this.recipeDetails(parseInt(id));
    this.getEquipmentsDetails(parseInt(id));

    /*setTimeout(() => {
      console.log('recipeDetail.summary : ' + this.summary);
    }, 2000);*/
  }

  recipeDetails(id: number) {
    this.recipeService.getRecipeDetails(id).subscribe((data) => {
      this.recipeDetail = data;
      this.analyzedInstructions = this.recipeDetail.analyzedInstructions;
      this.summary = this.sanitizer.bypassSecurityTrustHtml(this.recipeDetail.summary);

      console.log('expect true at loading: ' + this.loading);

      this.instructions = this.sanitizer.bypassSecurityTrustHtml(this.recipeDetail.instructions);
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  getEquipmentsDetails(id: number) {
    this.recipeService.getEquipmentsDetails(id).subscribe((data) => {
      this.equipmentDetails = data;
      this.loading = false;
    });
  }

  getIngredientDetails(id: number) {
    this.router.navigate(['ingredients/ingredientdetails/' + id]);
  }

  addDatatoPieChart() {
    Object.entries(this.tasteDetails).forEach(([key, value]) => {
      this.tasteArray.push(value);
    });
  }

  getWineData(query: string) {
    this.wineParingName = query.replace(/\s+/g, '_');
    this.recipeService.getWineDescription(this.wineParingName).subscribe({
      next: (data) => {
        this.wineParingDescription = data;
        if (this.wineParingDescription.status == 'failure') {
          this.sharedService.notify(
            'error',
            query.toUpperCase(),
            this.wineParingDescription.message,
          );
        } else {
          this.sharedService.notify(
            'info',
            query.toUpperCase(),
            this.wineParingDescription.wineDescription,
          );
        }
      },
      error: (error) => {
        this.sharedService.notify('error', query.toUpperCase(), error.error.message);
      },
    });
  }
}
