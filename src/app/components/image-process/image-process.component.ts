import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-image-process',
    templateUrl: './image-process.component.html',
    styleUrls: ['./image-process.component.scss']
})

export class ImageProcessComponent implements OnInit {

    // vars
    @ViewChild('selectImage', {static: false}) selectImage: ElementRef;

    imageChangedEvent: any;
    croppedImage: any;
    showCropper = true;
    showFilter = false;
    type = 'image/jpg';

    constructor() { }

    ngOnInit(): void {
    }

    clickFileButton() {
        this.selectImage.nativeElement.click();
    }

    selectInputEvent(event: any) {
        this.loadCropper();
        const files = event.target.files;
        const file: File = files[0];
        this.type = file.type;
        this.imageChangedEvent = event;
    }

    saveCroppedImage(event) {
        this.croppedImage = event;
        this.showCropper = false;
        this.showFilter = true;
    }

    loadCropper() {
        this.croppedImage = null;
        this.imageChangedEvent = null;
        this.showCropper = true;
        this.showFilter = false;
    }

    goback(event) {
        this.showCropper = true;
        this.showFilter = false;
    }

}

