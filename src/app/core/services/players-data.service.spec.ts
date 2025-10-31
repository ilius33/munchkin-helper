import { TestBed } from '@angular/core/testing';

import { PlayersDataService } from './players-data.service';

describe('PlayersData', () => {
  let service: PlayersDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayersDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
