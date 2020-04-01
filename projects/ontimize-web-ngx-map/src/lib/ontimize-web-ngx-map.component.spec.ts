import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntimizeWebNgxMapComponent } from './ontimize-web-ngx-map.component';

describe('OntimizeWebNgxMapComponent', () => {
  let component: OntimizeWebNgxMapComponent;
  let fixture: ComponentFixture<OntimizeWebNgxMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntimizeWebNgxMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntimizeWebNgxMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
