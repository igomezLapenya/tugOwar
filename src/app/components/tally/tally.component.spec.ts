import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TallyComponent } from './tally.component';
import { VoteService } from '../../services/vote.service';
import { SUPABASE_CLIENT } from '../../supabase.provider';

describe('TallyComponent', () => {
  let component: TallyComponent;
  let fixture: ComponentFixture<TallyComponent>;
  let mockVoteService: any;

  beforeEach(async () => {
    mockVoteService = {
      results: jasmine.createSpy('results').and.returnValue({ yes_count: 3, no_count: 1 })
    };

    await TestBed.configureTestingModule({
      imports: [TallyComponent],
      providers: [
        { provide: VoteService, useValue: mockVoteService },
        { provide: SUPABASE_CLIENT, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total votes', () => {
    expect(component.totalVotes()).toBe(4);
  });

  it('should calculate yes percentage', () => {
    expect(component.yesPercentage()).toBe(75);
  });

  it('should calculate no percentage', () => {
    expect(component.noPercentage()).toBe(25);
  });
});
