import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployePage } from './employe-create.component';

describe('EmployeCreateComponent', () => {
  let component: CreateEmployePage;
  let fixture: ComponentFixture<CreateEmployePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmployePage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEmployePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
