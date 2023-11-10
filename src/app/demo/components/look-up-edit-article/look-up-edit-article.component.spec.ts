import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookUpEditArticleComponent } from './look-up-edit-article.component';

describe('LookUpEditArticleComponent', () => {
  let component: LookUpEditArticleComponent;
  let fixture: ComponentFixture<LookUpEditArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LookUpEditArticleComponent]
    });
    fixture = TestBed.createComponent(LookUpEditArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
