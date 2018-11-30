import { TestBed } from '@angular/core/testing';

import { DispenserService } from './dispenser.service';

describe('DispenserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DispenserService = TestBed.get(DispenserService);
    expect(service).toBeTruthy();
  });
});
