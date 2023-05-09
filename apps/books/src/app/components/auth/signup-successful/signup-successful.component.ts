import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'books-signup-successful',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './signup-successful.component.html',
    styleUrls: ['./signup-successful.component.scss'],
})
export class SignupSuccessfulComponent {}
