import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'app/models/category.model';
import { ApiService } from 'app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
;

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {

  categoryForm: FormGroup;
  inProcess = false;
  submitted = false;
  label = 'Create';
  category: Category;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private toastr: ToastrService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.buildForm();
  }

  @Input('category') set data(category) {
    if (category) {
      this.category = category;
      this.label = 'Update'
      this.updateForm(this.category);
    }
  }

  ngOnInit() {
  }

  buildForm() {
    this.categoryForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  updateForm(category) {
    if (!category) { return; }
    this.categoryForm.patchValue({
      name: category.name,
    })
  }

  backClicked() {
    this.location.back();
  }

  onSubmit() {
    this.submitted = true;

    if (!this.categoryForm.valid) {
      this.inProcess = false;
      return;
    }
    let endPoint = 'category';
    if (this.category && this.category.categoryId) {
      endPoint = 'category/' + this.category.categoryId;
    }

    this.inProcess = true;
    this.apiService.post(endPoint, this.categoryForm.value).subscribe(
      data => {
        this.inProcess = false;
        this.toastr.success(data['message']);
        this.router.navigateByUrl('/question-bank/categories');
      },
      error => {
        this.inProcess = false;
        this.toastr.error(error['error']['message']);
      }
    );
  }
}
