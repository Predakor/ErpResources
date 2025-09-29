import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployesPage } from './manage-employes.component';

describe('ManageEmployesComponent', () => {
  let component: ManageEmployesPage;
  let fixture: ComponentFixture<ManageEmployesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEmployesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageEmployesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
