import { Injectable, Inject, signal, computed } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase.provider';

export interface PollResults {
  yes_count: number;
  no_count: number;
}

export interface Vote {
  user_id: string;
  vote: boolean;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private _myVote = signal<Vote | null>(null);
  private _results = signal<PollResults | null>(null);
  private _loading = signal(false);

  readonly myVote = computed(() => this._myVote());
  readonly results = computed(() => this._results());
  readonly loading = computed(() => this._loading());
  readonly hasVoted = computed(() => !!this._myVote());

  constructor(@Inject(SUPABASE_CLIENT) private supabase: SupabaseClient) {}

  async fetchMyVote(userId: string): Promise<void> {
    const { data, error } = await this.supabase
      .from('votes')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned, which is fine
      throw error;
    }

    this._myVote.set(data as Vote | null);
  }

  async castVote(userId: string, vote: boolean): Promise<void> {
    this._loading.set(true);
    try {
      const { data, error } = await this.supabase
        .from('votes')
        .upsert(
          { user_id: userId, vote, updated_at: new Date().toISOString() },
          { onConflict: 'user_id' }
        )
        .select()
        .single();

      if (error) throw error;

      this._myVote.set(data as Vote);

      // Refresh results after voting
      await this.fetchResults();
    } finally {
      this._loading.set(false);
    }
  }

  async fetchResults(): Promise<void> {
    const { data, error } = await this.supabase
      .rpc('get_poll_results')
      .single();

    if (error) throw error;

    this._results.set(data as PollResults);
  }

  clearVote(): void {
    this._myVote.set(null);
    this._results.set(null);
  }
}
