import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { SUPABASE_CLIENT } from '../supabase.provider';
import { Session, User } from '@supabase/supabase-js';

describe('AuthService', () => {
  let service: AuthService;
  let mockSupabaseClient: any;
  let authStateCallback: ((event: string, session: any) => void) | null = null;

  const mockUser: User = {
    id: '123',
    email: 'test@example.com',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString()
  } as User;

  const mockSession: Session = {
    access_token: 'token',
    refresh_token: 'refresh',
    expires_in: 3600,
    token_type: 'bearer',
    user: mockUser
  } as Session;

  beforeEach(() => {
    mockSupabaseClient = {
      auth: {
        getSession: jasmine.createSpy('getSession').and.returnValue(
          Promise.resolve({ data: { session: null }, error: null })
        ),
        signInWithOAuth: jasmine.createSpy('signInWithOAuth').and.returnValue(
          Promise.resolve({ error: null })
        ),
        signOut: jasmine.createSpy('signOut').and.returnValue(
          Promise.resolve({ error: null })
        ),
        onAuthStateChange: jasmine.createSpy('onAuthStateChange').and.callFake(
          (callback: any) => {
            authStateCallback = callback;
            return { data: { subscription: { unsubscribe: () => {} } } };
          }
        )
      }
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: SUPABASE_CLIENT, useValue: mockSupabaseClient }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with no session (not authenticated)', () => {
    expect(service.isAuthenticated()).toBeFalse();
    expect(service.session()).toBeNull();
    expect(service.user()).toBeNull();
  });

  it('should call signInWithOAuth with github provider on login', async () => {
    await service.signInWithGitHub();
    expect(mockSupabaseClient.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: 'github',
      options: {
        redirectTo: window.location.origin
      }
    });
  });

  it('should call signOut on logout', async () => {
    await service.signOut();
    expect(mockSupabaseClient.auth.signOut).toHaveBeenCalled();
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should update session when auth state changes to signed in', () => {
    if (authStateCallback) {
      authStateCallback('SIGNED_IN', mockSession);
    }

    expect(service.isAuthenticated()).toBeTrue();
    expect(service.session()).toEqual(mockSession as any);
    expect(service.user()).toEqual(mockUser as any);
  });

  it('should clear session when auth state changes to signed out', () => {
    // First sign in
    if (authStateCallback) {
      authStateCallback('SIGNED_IN', mockSession);
    }
    expect(service.isAuthenticated()).toBeTrue();

    // Then sign out
    if (authStateCallback) {
      authStateCallback('SIGNED_OUT', null);
    }
    expect(service.isAuthenticated()).toBeFalse();
    expect(service.session()).toBeNull();
    expect(service.user()).toBeNull();
  });
});
