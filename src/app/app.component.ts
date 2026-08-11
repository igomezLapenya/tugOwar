import { Component, OnInit, effect, signal } from '@angular/core';
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

  readonly slides = [
    {
      id: 'benefits',
      label: 'Ventajas del enfoque SPEC-driven',
      image: 'assets/images/ventajas SPEC driven.png',
      alt: 'Ilustración con las ventajas de trabajar con un enfoque SPEC-driven'
    },
    {
      id: 'openspec',
      label: '¿Por qué OpenSpec?',
      image: 'assets/images/porque OpenSPec.png',
      alt: 'Ilustración que explica por qué adoptar OpenSpec'
    },
    {
      id: 'vote',
      label: 'Votación',
      image: null,
      alt: ''
    }
  ] as const;

  readonly activeSlide = signal(0);

  constructor(
    public auth: AuthService,
    public voteService: VoteService
  ) {
    // When auth state changes, load or clear vote (solo para votantes autorizados,
    // ya que RLS rechazaría la consulta para cualquier otro usuario)
    effect(() => {
      const user = this.auth.user();
      if (user && this.auth.isAllowedVoter()) {
        this.voteService.fetchMyVote(user.id);
      } else {
        this.voteService.clearVote();
      }
    });
  }

  previousSlide(): void {
    this.activeSlide.update((current) =>
      current === 0 ? this.slides.length - 1 : current - 1
    );
  }

  nextSlide(): void {
    this.activeSlide.update((current) => (current + 1) % this.slides.length);
  }

  selectSlide(index: number): void {
    if (index >= 0 && index < this.slides.length) {
      this.activeSlide.set(index);
    }
  }

  ngOnInit(): void {
    // If already authenticated and authorized on init, load vote
    const user = this.auth.user();
    if (user && this.auth.isAllowedVoter()) {
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
