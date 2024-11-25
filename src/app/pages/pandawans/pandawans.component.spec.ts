import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PandawansComponent } from './pandawans.component';

describe('PandawansComponent', () => {
  let component: PandawansComponent;
  let fixture: ComponentFixture<PandawansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PandawansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PandawansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
