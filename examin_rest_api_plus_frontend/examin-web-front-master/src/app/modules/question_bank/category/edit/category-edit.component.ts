import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'app/models/category.model';
import { ApiService } from 'app/shared/services/api.service';


@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html'
})
export class CategoryEditComponent implements OnInit {

  categoryId: number;
  category: Category;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.getCategory(this.categoryId);
    });
  }

  ngOnInit() {
  }

  getCategory(categoryId) {
    this.apiService.get('category/' + categoryId).subscribe((data) => {
      if (data['category']) {
        this.category = data['category'];
      }
    });
  }


}
