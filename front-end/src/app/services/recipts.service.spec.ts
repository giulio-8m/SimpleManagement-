import { TestBed } from '@angular/core/testing';

import { ReciptsService } from './recipts.service';

describe('ReciptsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReciptsService = TestBed.get(ReciptsService);
    expect(service).toBeTruthy();
  });
});
