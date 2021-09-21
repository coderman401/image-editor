import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Dimensions, ImageCroppedEvent, base64ToFile, ImageTransform } from 'ngx-image-cropper';

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss']
})
export class CropImageComponent {
    // vars
    @Input() imageChangedEvent: any;
    @Input() type: string;
    @Output() cropImage = new EventEmitter();

    showCropper = false;
    croppedImage: any = '';
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};
    aspectRatio = '1:1';
    ratio = 1 / 1;
    aspectRatios = [
        '1:1', '4:3', '16:9', '3:4', '9:16'
    ];


    constructor() {
    }

    // show cropper when image is loaded.
    imageLoaded() {
        this.resetImage();
        this.showCropper = true;
    }

    cropperReady(sourceImageDimensions: Dimensions) {
        // console.log('Cropper ready', sourceImageDimensions);
    }

    // image load fail exception
    loadImageFailed() {
        console.log('Load failed');
        alert('Image Load Failed');
    }

    // image cropping
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        console.log(event, base64ToFile(event.base64));
    }

    /**
     * performing some operations on image start.
     */

     // rotate image counter clock wise
    rotateLeft() {
        this.canvasRotation--;
        this.flipAfterRotate();
    }

    // rotate image clock wise
    rotateRight() {
        this.canvasRotation++;
        this.flipAfterRotate();
    }

    // mannual rotation by degree
    updateRotation() {
        this.transform = {
            ...this.transform,
            rotate: this.rotation
        };
    }

    private flipAfterRotate() {
        const flippedH = this.transform.flipH;
        const flippedV = this.transform.flipV;
        this.transform = {
            ...this.transform,
            flipH: flippedV,
            flipV: flippedH
        };
    }

    // setting aspect ratio of image
    setAspectRatio(ratio) {
        this.aspectRatio = ratio;
        const value = ratio.split(':');
        this.ratio = value[0] / value[1];
    }

    // zoom out image
    zoomOut() {
        this.scale -= .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    // zoom in image
    zoomIn() {
        this.scale += .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    toggleContainWithinAspectRatio() {
        this.containWithinAspectRatio = !this.containWithinAspectRatio;
    }

    // save cropped image and emit the event.
    saveCroppedImage() {
        this.showCropper = false;
        this.cropImage.emit(this.croppedImage);
    }

    flipHorizontal() {
        this.transform = {
            ...this.transform,
            flipH: !this.transform.flipH
        };
    }

    flipVertical() {
        this.transform = {
            ...this.transform,
            flipV: !this.transform.flipV
        };
    }

    // reset image clear transformation.
    resetImage() {
        this.scale = 1;
        this.rotation = 0;
        this.canvasRotation = 0;
        this.transform = {};
    }

}
