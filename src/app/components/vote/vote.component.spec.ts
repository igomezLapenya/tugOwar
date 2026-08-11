import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoteComponent } from './vote.component';
import { VoteService } from '../../services/vote.service';
import { SUPABASE_CLIENT } from '../../supabase.provider';

describe('VoteComponent', () => {
  let component: VoteComponent;
  let fixture: ComponentFixture<VoteComponent>;
  let mockVoteService: any;

  beforeEach(async () => {
    mockVoteService = {
      myVote: jasmine.createSpy('myVote').and.returnValue(null),
      loading: jasmine.createSpy('loading').and.returnValue(false),
      castVote: jasmine.createSpy('castVote').and.returnValue(Promise.resolve())
    };

    await TestBed.configureTestingModule({
      imports: [VoteComponent],
      providers: [
        { provide: VoteService, useValue: mockVoteService },
        { provide: SUPABASE_CLIENT, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VoteComponent);
    component = fixture.componentInstance;
    component.userId = 'u1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call castVote when voting yes', async () => {
    await component.vote(true);
    expect(mockVoteService.castVote).toHaveBeenCalledWith('u1', true);
  });

  it('should call castVote when voting no', async () => {
    await component.vote(false);
    expect(mockVoteService.castVote).toHaveBeenCalledWith('u1', false);
  });

  it('should not vote when loading', async () => {
    mockVoteService.loading.and.returnValue(true);
    await component.vote(true);
    expect(mockVoteService.castVote).not.toHaveBeenCalled();
  });
});
