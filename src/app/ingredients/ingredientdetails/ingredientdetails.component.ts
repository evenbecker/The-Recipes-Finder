import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientsService } from 'src/app/services/ingredients.service';

@Component({
  selector: 'app-ingredientdetails',
  standalone: false,
  templateUrl: './ingredientdetails.component.html',
  styleUrls: ['./ingredientdetails.component.scss'],
})
export class IngredientdetailsComponent {
  ingredientDetail: any = {};
  ingredientSubstitute: any = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ingredientsService: IngredientsService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.getIngredientDetails(parseInt(id));
    this.getIngredientSubstitute(parseInt(id));
  }

  getIngredientDetails(id: number) {
    this.ingredientsService.getIngredientDetails(id).subscribe((data) => {
      this.ingredientDetail = data;
      this.cdr.detectChanges();
    });
  }

  getIngredientSubstitute(id: number) {
    this.ingredientsService.getIngredientSubstitute(id).subscribe((data) => {
      this.ingredientSubstitute = data;
      this.cdr.detectChanges();
    });
  }
}
