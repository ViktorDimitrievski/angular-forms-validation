import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailChange } from './email-change';

describe('EmailChange', () => {
  let component: EmailChange;
  let fixture: ComponentFixture<EmailChange>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailChange],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailChange);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
