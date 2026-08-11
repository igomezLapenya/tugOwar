import { Component, Input } from '@angular/core';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-vote',
  imports: [],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.css'
})
export class VoteComponent {
  @Input() userId!: string;

  constructor(public voteService: VoteService) {}

  async vote(value: boolean) {
    if (!this.userId || this.voteService.loading()) return;
    await this.voteService.castVote(this.userId, value);
  }
}
