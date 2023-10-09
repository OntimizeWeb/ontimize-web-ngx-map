import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchModeThemeComponent } from './switch-mode-theme.component';

describe('SwitchModeThemeComponent', () => {
  let component: SwitchModeThemeComponent;
  let fixture: ComponentFixture<SwitchModeThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchModeThemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchModeThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
