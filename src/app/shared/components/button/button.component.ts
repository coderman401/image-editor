import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

    @Input() type;
    @Input() icon;
    @Input() text;
    @Output() clickButton = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    click() {
        this.clickButton.emit();
    }

}
