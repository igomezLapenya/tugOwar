import { Component, OnInit, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { VoteService } from './services/vote.service';
import { VoteComponent } from './components/vote/vote.component';
import { TallyComponent } from './components/tally/tally.component';
import { IllustrationComponent } from './components/illustration/illustration.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, VoteComponent, TallyComponent, IllustrationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'tugowar';

  constructor(
    public auth: AuthService,
    public voteService: VoteService
  ) {
    // When auth state changes, load or clear vote
    effect(() => {
      const user = this.auth.user();
      if (user) {
        this.voteService.fetchMyVote(user.id);
      } else {
        this.voteService.clearVote();
      }
    });
  }

  ngOnInit(): void {
    // If already authenticated on init, load vote
    const user = this.auth.user();
    if (user) {
      this.voteService.fetchMyVote(user.id);
    }
  }

  async login() {
    await this.auth.signInWithGitHub();
  }

  async logout() {
    await this.auth.signOut();
    this.voteService.clearVote();
  }
}
