import { Injectable, Inject, signal, computed } from '@angular/core';
import { SupabaseClient, User, Session } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase.provider';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _session = signal<Session | null>(null);
  private _user = signal<User | null>(null);

  readonly session = computed(() => this._session());
  readonly user = computed(() => this._user());
  readonly isAuthenticated = computed(() => !!this._session());

  constructor(@Inject(SUPABASE_CLIENT) private supabase: SupabaseClient) {
    // Restore session on init
    this.supabase.auth.getSession().then(({ data }) => {
      this._session.set(data.session);
      this._user.set(data.session?.user ?? null);
    });

    // Listen to auth state changes
    this.supabase.auth.onAuthStateChange((event, session) => {
      this._session.set(session);
      this._user.set(session?.user ?? null);
    });
  }

  async signInWithGitHub(): Promise<void> {
    const { error } = await this.supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        // Respeta el <base href> compilado para GitHub Pages (/tugOwar/).
        redirectTo: new URL(document.baseURI).href
      }
    });
    if (error) {
      throw error;
    }
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw error;
    }
    this._session.set(null);
    this._user.set(null);
  }
}
