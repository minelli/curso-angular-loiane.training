import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuPrimeiroCliComponent } from './meu-primeiro-cli.component';

describe('MeuPrimeiroCliComponent', () => {
  let component: MeuPrimeiroCliComponent;
  let fixture: ComponentFixture<MeuPrimeiroCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeuPrimeiroCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuPrimeiroCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
