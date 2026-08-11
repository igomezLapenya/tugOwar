import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SUPABASE_CLIENT } from './supabase.provider';

describe('AppComponent', () => {
  const mockSupabaseClient = {
    auth: {
      getSession: jasmine.createSpy('getSession').and.returnValue(
        Promise.resolve({ data: { session: null }, error: null })
      ),
      onAuthStateChange: jasmine.createSpy('onAuthStateChange').and.returnValue(
        { data: { subscription: { unsubscribe: () => {} } } }
      )
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: SUPABASE_CLIENT, useValue: mockSupabaseClient }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'tugowar' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tugowar');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('¿Adoptamos OpenSpec?');
  });
});
