import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'app/models/category.model';
import { ApiService } from 'app/shared/services/api.service';
import { FileService } from 'app/shared/services/file.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-upload-list',
  templateUrl: './question-upload.component.html'
})
export class BankQuestionUploadComponent implements OnInit {

  category = undefined;
  submitted = false
  uploadResponse;
  uploadError;
  categories: Category[];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fileService: FileService,
    private router: Router
  ) {
    this.getCategories();
  }

  ngOnInit() {

  }

  getCategories() {
    this.apiService.get('category').subscribe((data) => {
      if (data && data['categories']) {
        this.categories = data['categories'];
      }
    });
  }

  setCategory(event) {
    this.category = event.target.value;
  }

  fileChangeEvent(event) {
    if (this.category) {
      const fileList: FileList = (<HTMLInputElement>event.target).files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData = new FormData();
        formData.append('fileExtension', 'xlsx');
        formData.append('fileType', 'question');
        formData.append('file', file, file.name);
        formData.append('categoryId', this.category);
        // upload file
        this.fileService.upload(`question-bank/import`, formData).subscribe(
          (res) => {
            this.uploadResponse = res;
            if (res['progress'] >= 100) {
              this.toastr.success('Questions are uploaded successfully!');
              this.router.navigateByUrl('/question-bank');
            }
          },
          (err) => this.uploadError = err
        );
      }
    } else {
      this.toastr.success('Please select category!');
    }
  }

}
