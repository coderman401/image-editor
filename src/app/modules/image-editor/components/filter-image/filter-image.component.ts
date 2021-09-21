import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Filter } from '../../../../shared/models/filter.mode';
import { FILTERS } from '../../../../shared/configs/filter-list.data';

@Component({
    selector: 'app-filter-image',
    templateUrl: './filter-image.component.html',
    styleUrls: ['./filter-image.component.scss']
})
export class FilterImageComponent implements OnInit {

    // vars
    @ViewChild('addFilter', { static: false }) addFilter: ElementRef;

    @Input() imageChanged;
    @Input() type: string;
    @Output() back = new EventEmitter();

    // filter vars
    filters: Filter[] = FILTERS;
    currentFilter: Filter;
    selected = 0;
    sepia;
    brightness;
    saturate;
    contrast;
    hueRotate;
    grayScale;

    // watermark vars
    isWatermark = false;
    watermarkText = 'Kishan';
    watermarkTextSize = 18;
    watermarkColor = '#000';
    watermarkAlpha = 1;
    watermarkX = '';
    watermarkY = '';

    constructor() {
        this.initFilter();
    }

    ngOnInit(): void {
    }

    initFilter() {
        this.currentFilter = this.filters[0];
        this.sepia = this.currentFilter.filterParams.sepia * 100;
        this.brightness = this.currentFilter.filterParams.brightness * 100;
        this.saturate = this.currentFilter.filterParams.saturate * 100;
        this.contrast = this.currentFilter.filterParams.contrast * 100;
        this.hueRotate = this.currentFilter.filterParams.hueRotate;
        this.grayScale = this.currentFilter.filterParams.grayScale * 100;
    }

    // manually filter apply
    onInputChange(event) {
        this.addFilterClass();
    }

    applyFilter(event) {
        this.currentFilter = event;
        this.selected = this.filters.indexOf(event);
        this.sepia = Math.round(this.currentFilter.filterParams.sepia * 100);
        this.brightness = Math.round(this.currentFilter.filterParams.brightness * 100);
        this.saturate = Math.round(this.currentFilter.filterParams.saturate * 100);
        this.contrast = Math.round(this.currentFilter.filterParams.contrast * 100);
        this.hueRotate = Math.round(this.currentFilter.filterParams.hueRotate);
        this.grayScale = Math.round(this.currentFilter.filterParams.grayScale * 100);
        this.addFilterClass();
    }

    addFilterClass() {
        this.currentFilter.generatedFilter = '';
        this.currentFilter.generatedFilter += `sepia(${this.sepia / 100})`;
        this.currentFilter.generatedFilter += ` brightness(${this.brightness / 100})`;
        this.currentFilter.generatedFilter += ` saturate(${this.saturate / 100})`;
        this.currentFilter.generatedFilter += ` contrast(${this.contrast / 100})`;
        this.currentFilter.generatedFilter += ` hue-rotate(${this.hueRotate}deg)`;
        this.currentFilter.generatedFilter += ` grayscale(${this.grayScale / 100})`;
        if (this.isWatermark) {
            this.changeWatermark('');
        } else {
            const el: any = document.getElementById('addFilter');
            el.style = `filter: ${this.currentFilter.generatedFilter}`;
        }
    }


    addRemoveWatermark(event) {
        if (!this.isWatermark) {
            const el: any = document.getElementById('addFilter');
            el.style = `filter: ${this.currentFilter.generatedFilter}`;
        }
        const canvas = document.createElement('canvas') as HTMLCanvasElement;
        const img = new Image();
        img.crossOrigin = '';
        img.src = this.imageChanged;
        img.onload = () => {
            this.loadCanvas(canvas, img, 'watermark');
            const tempCanvas = document.createElement('canvas');
            tempCanvas.setAttribute('id', 'canvas');
            // tempCanvas.width = 200;
            // tempCanvas.height = 200;
            this.addWaterMarkInCanvas(canvas, tempCanvas);
            const div = document.getElementById('addCanvasWatermark');
            if (div) {
                div.appendChild(tempCanvas);
            }
        };
    }

    changeWatermark(event) {
        const canvas = document.createElement('canvas') as HTMLCanvasElement;
        const img = new Image();
        img.crossOrigin = '';
        img.src = this.imageChanged;
        img.onload = () => {
            this.loadCanvas(canvas, img, 'watermark');
            const tempCanvas = document.getElementById('canvas') as HTMLCanvasElement;
            if (tempCanvas) {
                this.addWaterMarkInCanvas(canvas, tempCanvas);
            }
        };
    }

    loadCanvas(canvas: HTMLCanvasElement, img, type = '') {
        const ctx = canvas.getContext ? canvas.getContext('2d') : null;
        canvas.setAttribute('width', img.width.toString());
        canvas.setAttribute('height', img.height.toString());
        if (type === 'watermark' || type === 'save') {
            ctx.filter = this.currentFilter.generatedFilter;
        }
        ctx.drawImage(img, 0, 0, img.width, img.height);
    }

    addWaterMarkInCanvas(canvas: HTMLCanvasElement, tempCanvas: HTMLCanvasElement) {
        const tempCtx = tempCanvas.getContext('2d');
        let cw;
        let ch;
        cw = tempCanvas.width = canvas.width;
        ch = tempCanvas.height = canvas.height;
        tempCtx.drawImage(canvas, 0, 0);
        this.watermarkTextSize = ch / 10;
        tempCtx.font = `${this.watermarkTextSize}px Roboto`;
        const textWidth = tempCtx.measureText(this.watermarkText).width;
        tempCtx.globalAlpha = this.watermarkAlpha;
        tempCtx.fillStyle = this.watermarkColor;
        const flotX = this.watermarkTextSize;
        const flotY = this.watermarkTextSize;
        tempCtx.fillText(this.watermarkText, cw - textWidth - flotX, ch - flotY);
    }

    saveImage() {
        const canvas = document.createElement('canvas') as HTMLCanvasElement;
        const img = new Image();
        img.crossOrigin = '';
        img.src = this.imageChanged;
        img.onload = () => {
            this.loadCanvas(canvas, img, 'save');
            const tempCanvas = document.createElement('canvas');
            if (this.isWatermark) {
                this.addWaterMarkInCanvas(canvas, tempCanvas);
            } else {
                const tempCtx = tempCanvas.getContext('2d');
                tempCanvas.width = canvas.width;
                tempCanvas.height = canvas.height;
                tempCtx.drawImage(canvas, 0, 0);
            }
            const url = tempCanvas.toDataURL('image/base64;');
            const anchor = document.createElement('a');
            // const ext = this.type.replace('image/', '') || 'jpg';
            const timestamp = new Date().getTime();
            anchor.setAttribute('download', timestamp.toString());
            anchor.setAttribute('href', url);
            anchor.click();
        };
    }

    goBack() {
        this.back.emit();
    }
}
