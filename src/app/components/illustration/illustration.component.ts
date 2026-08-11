import { Component, DestroyRef, computed, effect, inject, signal } from '@angular/core';
import { VoteService } from '../../services/vote.service';

/** Porcentaje mínimo de votos "Sí" necesario para que el cohete despegue. */
const LAUNCH_THRESHOLD = 70;
/** Duración total de la secuencia de despegue (ms), debe coincidir con la animación CSS. */
const LAUNCH_ANIMATION_MS = 2600;

@Component({
  selector: 'app-illustration',
  imports: [],
  templateUrl: './illustration.component.html',
  styleUrl: './illustration.component.css'
})
export class IllustrationComponent {
  private readonly voteService = inject(VoteService);
  private audioCtx: AudioContext | null = null;
  private launchTimeout: ReturnType<typeof setTimeout> | null = null;

  readonly launchThreshold = LAUNCH_THRESHOLD;

  readonly totalVotes = computed(() => {
    const r = this.voteService.results();
    if (!r) return 0;
    return (r.yes_count || 0) + (r.no_count || 0);
  });

  /** "Combustible": porcentaje de votos a favor. */
  readonly yesPercentage = computed(() => {
    const total = this.totalVotes();
    if (total === 0) return 0;
    const r = this.voteService.results();
    return Math.round(((r?.yes_count || 0) / total) * 100);
  });

  /** "Gravedad / asteroides": porcentaje de votos en contra. */
  readonly noPercentage = computed(() => {
    const total = this.totalVotes();
    if (total === 0) return 0;
    return 100 - this.yesPercentage();
  });

  /** Cantidad de asteroides visibles (0-4) según la resistencia del "No". */
  readonly asteroidCount = computed(() => {
    if (this.totalVotes() === 0) return 0;
    return Math.min(4, Math.ceil(this.noPercentage() / 25));
  });

  /** Índices auxiliares para dibujar los asteroides activos con @for. */
  readonly asteroidIndices = computed(() => Array.from({ length: this.asteroidCount() }, (_, i) => i));

  /** Posiciones fijas (puntos de polígono) para hasta 4 asteroides, dibujados alrededor de la trayectoria del cohete. */
  private readonly asteroidShapes = [
    '90,180 100,172 110,182 102,192',
    '250,110 262,104 270,116 258,122',
    '60,60 72,55 78,66 66,72',
    '300,220 312,214 320,224 308,230'
  ];

  asteroidPoints(index: number): string {
    return this.asteroidShapes[index % this.asteroidShapes.length];
  }

  readonly hasEnoughFuel = computed(
    () => this.totalVotes() > 0 && this.yesPercentage() >= LAUNCH_THRESHOLD
  );

  readonly isLaunching = signal(false);
  readonly hasLaunched = signal(false);

  readonly statusText = computed(() => {
    const total = this.totalVotes();
    if (total === 0) {
      return 'El cohete espera en la plataforma de lanzamiento, sin combustible todavía.';
    }
    if (this.hasLaunched()) {
      return `¡Despegue! El combustible alcanzó ${this.yesPercentage()}% y el cohete viaja hacia el planeta OpenSpec.`;
    }
    return `Combustible (Sí): ${this.yesPercentage()}%. Umbral de despegue: ${LAUNCH_THRESHOLD}%. Resistencia (No): ${this.noPercentage()}%.`;
  });

  constructor() {
    // Reacciona a los cambios en los resultados de la votación para disparar o cancelar el despegue.
    effect(() => {
      const ready = this.hasEnoughFuel();
      if (ready && !this.isLaunching() && !this.hasLaunched()) {
        this.startLaunch();
      } else if (!ready && (this.isLaunching() || this.hasLaunched())) {
        // Si los votos bajan del umbral, el cohete vuelve a la plataforma.
        this.resetToGround();
      }
    });

    inject(DestroyRef).onDestroy(() => {
      if (this.launchTimeout) clearTimeout(this.launchTimeout);
      this.audioCtx?.close().catch(() => {});
    });
  }

  private startLaunch(): void {
    this.isLaunching.set(true);
    this.playRetroLaunchSound();
    this.launchTimeout = setTimeout(() => {
      this.isLaunching.set(false);
      this.hasLaunched.set(true);
    }, LAUNCH_ANIMATION_MS);
  }

  private resetToGround(): void {
    if (this.launchTimeout) {
      clearTimeout(this.launchTimeout);
      this.launchTimeout = null;
    }
    this.isLaunching.set(false);
    this.hasLaunched.set(false);
  }

  /** Sintetiza una cuenta atrás y un despegue con sonido retro de 8 bits (Web Audio API, sin assets externos). */
  private playRetroLaunchSound(): void {
    try {
      const AudioCtxCtor: typeof AudioContext | undefined =
        window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxCtor) return;
      if (!this.audioCtx) this.audioCtx = new AudioCtxCtor();
      const ctx = this.audioCtx;
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});

      const beep = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.08, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
        osc.connect(gain).connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      // Cuenta atrás: tres pitidos cortos.
      beep(440, 0, 0.12);
      beep(440, 0.25, 0.12);
      beep(440, 0.5, 0.12);

      // Despegue: barrido ascendente de frecuencia (efecto "8-bit liftoff").
      const sweep = ctx.createOscillator();
      const sweepGain = ctx.createGain();
      sweep.type = 'square';
      sweep.frequency.setValueAtTime(220, ctx.currentTime + 0.75);
      sweep.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 1.55);
      sweepGain.gain.setValueAtTime(0.1, ctx.currentTime + 0.75);
      sweepGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.75);
      sweep.connect(sweepGain).connect(ctx.destination);
      sweep.start(ctx.currentTime + 0.75);
      sweep.stop(ctx.currentTime + 1.75);
    } catch {
      // El sonido es un extra decorativo: si el navegador bloquea el audio (autoplay), lo ignoramos.
    }
  }
}
