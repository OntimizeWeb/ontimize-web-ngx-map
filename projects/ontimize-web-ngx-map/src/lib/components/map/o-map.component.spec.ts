import { Injector } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppConfig, appConfigFactory, APP_CONFIG, OntimizeWebModule, ONTIMIZE_PROVIDERS, OPermissionsModule } from 'ontimize-web-ngx';

import { OMapModule } from '../../ontimize-web-ngx-map.module';
import { OMapComponent } from './o-map.component';

describe('ChartComponent', () => {
  let component: OMapComponent;
  let fixture: ComponentFixture<OMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        OntimizeWebModule,
        OPermissionsModule,
        NoopAnimationsModule,
        OMapModule
      ],
      providers: [
        {
          provide: APP_CONFIG, useValue: {
            uuid: 'com.ontimize.web.test',
            title: 'Ontimize Web Testing',
            locale: 'en'
          }
        },
        { provide: AppConfig, useFactory: appConfigFactory, deps: [Injector] },
        ...ONTIMIZE_PROVIDERS
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});