import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { MyAdrComponent } from './my-adr.component';

describe('MyAdrComponent', () => {
  let component: MyAdrComponent;
  let fixture: ComponentFixture<MyAdrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAdrComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAdrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
