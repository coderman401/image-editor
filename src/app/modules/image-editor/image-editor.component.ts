import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-image-editor',
    templateUrl: './image-editor.component.html',
    styleUrls: ['./image-editor.component.scss']
})

export class ImageEditorComponent implements OnInit {

    // vars
    @ViewChild('selectImage', { static: false }) selectImage: ElementRef;

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

    goBack(event) {
        this.showCropper = true;
        this.showFilter = false;
    }

}

