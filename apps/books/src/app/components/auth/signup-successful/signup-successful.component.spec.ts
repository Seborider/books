import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupSuccessfulComponent } from './signup-successful.component';

describe('SignupSuccessfulComponent', () => {
    let component: SignupSuccessfulComponent;
    let fixture: ComponentFixture<SignupSuccessfulComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SignupSuccessfulComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SignupSuccessfulComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
