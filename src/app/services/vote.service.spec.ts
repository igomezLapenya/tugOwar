import { TestBed } from '@angular/core/testing';
import { VoteService, PollResults } from './vote.service';
import { SUPABASE_CLIENT } from '../supabase.provider';

describe('VoteService', () => {
  let service: VoteService;
  let mockSupabaseClient: any;
  let mockFrom: any;
  let mockRpc: any;

  beforeEach(() => {
    mockFrom = jasmine.createSpy('from');
    mockRpc = jasmine.createSpy('rpc');

    mockSupabaseClient = {
      from: mockFrom,
      rpc: mockRpc
    };

    TestBed.configureTestingModule({
      providers: [
        VoteService,
        { provide: SUPABASE_CLIENT, useValue: mockSupabaseClient }
      ]
    });

    service = TestBed.inject(VoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with no vote', () => {
    expect(service.hasVoted()).toBeFalse();
    expect(service.myVote()).toBeNull();
    expect(service.results()).toBeNull();
  });

  it('should fetch my vote', async () => {
    const mockVote = { user_id: 'u1', vote: true, created_at: '2024-01-01', updated_at: '2024-01-01' };
    const mockSelect = jasmine.createSpy('select').and.returnValue({
      eq: jasmine.createSpy('eq').and.returnValue({
        single: jasmine.createSpy('single').and.returnValue(Promise.resolve({ data: mockVote, error: null }))
      })
    });
    mockFrom.and.returnValue({ select: mockSelect });

    await service.fetchMyVote('u1');

    expect(service.hasVoted()).toBeTrue();
    expect(service.myVote()?.vote).toBeTrue();
  });

  it('should cast first vote and fetch results', async () => {
    const mockVote = { user_id: 'u1', vote: true, created_at: '2024-01-01', updated_at: '2024-01-01' };
    const mockResults: PollResults = { yes_count: 1, no_count: 0 };

    const mockSelect = jasmine.createSpy('select').and.returnValue({
      single: jasmine.createSpy('single').and.returnValue(Promise.resolve({ data: mockVote, error: null }))
    });
    const mockUpsert = jasmine.createSpy('upsert').and.returnValue({
      select: jasmine.createSpy().and.returnValue({
        single: jasmine.createSpy('single').and.returnValue(Promise.resolve({ data: mockVote, error: null }))
      })
    });
    mockFrom.and.returnValue({ select: mockSelect, upsert: mockUpsert });

    const mockRpcSingle = jasmine.createSpy('single').and.returnValue(
      Promise.resolve({ data: mockResults, error: null })
    );
    mockRpc.and.returnValue({ single: mockRpcSingle });

    await service.castVote('u1', true);

    expect(service.hasVoted()).toBeTrue();
    expect(service.myVote()?.vote).toBeTrue();
    expect(service.results()).toEqual(mockResults);
    expect(service.loading()).toBeFalse();
  });

  it('should change vote and update results', async () => {
    const firstVote = { user_id: 'u1', vote: true, created_at: '2024-01-01', updated_at: '2024-01-01' };
    const changedVote = { user_id: 'u1', vote: false, created_at: '2024-01-01', updated_at: '2024-01-02' };
    const mockResults: PollResults = { yes_count: 0, no_count: 1 };

    const mockSelect = jasmine.createSpy('select').and.returnValue({
      single: jasmine.createSpy('single').and.returnValue(Promise.resolve({ data: changedVote, error: null }))
    });
    const mockUpsert = jasmine.createSpy('upsert').and.returnValue({
      select: jasmine.createSpy().and.returnValue({
        single: jasmine.createSpy('single').and.returnValue(Promise.resolve({ data: changedVote, error: null }))
      })
    });
    mockFrom.and.returnValue({ select: mockSelect, upsert: mockUpsert });

    const mockRpcSingle = jasmine.createSpy('single').and.returnValue(
      Promise.resolve({ data: mockResults, error: null })
    );
    mockRpc.and.returnValue({ single: mockRpcSingle });

    await service.castVote('u1', false);

    expect(service.myVote()?.vote).toBeFalse();
    expect(service.results()).toEqual(mockResults);
  });

  it('should fetch results via rpc', async () => {
    const mockResults: PollResults = { yes_count: 5, no_count: 3 };
    const mockRpcSingle = jasmine.createSpy('single').and.returnValue(
      Promise.resolve({ data: mockResults, error: null })
    );
    mockRpc.and.returnValue({ single: mockRpcSingle });

    await service.fetchResults();

    expect(service.results()).toEqual(mockResults);
  });
});
