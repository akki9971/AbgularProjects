import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {

  imageChangedEvent = '';
  croppedImage = '';
  @Input() buttonLabel = 'Save';
  @Output() submitImage: EventEmitter<any> =  new EventEmitter();

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit() { }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
    this.toastr.error('Failed to load the image!');
  }

  saveImage() {
    this.submitImage.emit(this.croppedImage);
  }

}
