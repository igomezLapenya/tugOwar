import { Component } from '@angular/core';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-tally',
  imports: [],
  templateUrl: './tally.component.html',
  styleUrl: './tally.component.css'
})
export class TallyComponent {
  constructor(public voteService: VoteService) {}

  totalVotes(): number {
    const r = this.voteService.results();
    if (!r) return 0;
    return (r.yes_count || 0) + (r.no_count || 0);
  }

  yesPercentage(): number {
    const total = this.totalVotes();
    if (total === 0) return 0;
    const r = this.voteService.results();
    return Math.round(((r?.yes_count || 0) / total) * 100);
  }

  noPercentage(): number {
    const total = this.totalVotes();
    if (total === 0) return 0;
    const r = this.voteService.results();
    return Math.round(((r?.no_count || 0) / total) * 100);
  }
}
