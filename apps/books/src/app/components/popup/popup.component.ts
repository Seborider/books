import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'books-popup',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
    @Input() text!: string;

    @Output() closePopup = new EventEmitter<void>();
    @Output() confirmPopup = new EventEmitter<void>();

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        this.closePopup.emit();
    }

    @HostListener('document:keydown.enter', ['$event'])
    onKeydownEnter(event: KeyboardEvent) {
        this.confirmPopup.emit();
    }
}
