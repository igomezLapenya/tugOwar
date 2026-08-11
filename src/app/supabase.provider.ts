import { InjectionToken } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

export const SUPABASE_CLIENT = new InjectionToken<SupabaseClient>('supabase.client');

export function provideSupabase() {
  return {
    provide: SUPABASE_CLIENT,
    useFactory: () => createClient(environment.supabaseUrl, environment.supabaseKey)
  };
}
