import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { JWTToken } from '@services/auth/auth.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService],
    });
    service = TestBed.inject(TokenService);
  });

  afterEach(() => {
    service.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Set', () => {
    it('should set token', () => {
      service.set(mockToken);
      expect(service.get()?.accessToken).toBe('abc');
    });

    it('should update expireTimer', () => {
      service.set(mockToken);
      const timestamp = Date.now();
      const expectedExpirationTime = mockToken.expiresIn * 1000 + timestamp;

      const tokenExpirationTime = service.expiresAt!;
      expect(tokenExpirationTime).not.toBeNull();
      expect(tokenExpirationTime.getTime()).toBeCloseTo(expectedExpirationTime);
    });
  });

  describe('Get', () => {
    it('should return null if no token', () => {
      const token = service.get();
      expect(token).toBeNull();
    });
    it('should return stored token if there is one stored', () => {
      sessionStorage.setItem('authKey', JSON.stringify(mockToken));

      const token = service.get();
      expect(token).toBeTruthy();
    });
  });
});

const mockToken: JWTToken = {
  accessToken: 'abc',
  expiresIn: 100,
  refreshToken: 'd',
  tokenType: 'Bearer',
};
