import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Personcomponent } from './personcomponent';

describe('Personcomponent', () => {
  let component: Personcomponent;
  let fixture: ComponentFixture<Personcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Personcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Personcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
