import { TestBed } from '@angular/core/testing';

import { Events } from './events.service';

describe('Events', () => {
  let service: Events;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Events);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
