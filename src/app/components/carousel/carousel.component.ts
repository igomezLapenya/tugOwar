import { NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, computed, contentChild, input, signal } from '@angular/core';

export interface CarouselSlide {
  readonly id: string;
  readonly label: string;
  readonly image?: string | null;
  readonly alt?: string;
}

export interface CarouselTemplateContext {
  readonly $implicit: CarouselSlide;
  readonly slide: CarouselSlide;
  readonly index: number;
}

let carouselId = 0;

@Component({
  selector: 'app-carousel',
  imports: [NgTemplateOutlet],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  readonly slides = input.required<readonly CarouselSlide[]>();
  readonly ariaLabel = input('Carousel');
  readonly activeSlide = signal(0);

  readonly slideTemplate = contentChild<TemplateRef<CarouselTemplateContext>>('slideContent');
  readonly currentSlide = computed(() => this.slides()[this.activeSlide()] ?? null);
  readonly panelId = computed(() => `${this.idPrefix}-panel-${this.activeSlide()}`);

  private readonly idPrefix = `carousel-${++carouselId}`;

  previousSlide(): void {
    const slides = this.slides();
    if (slides.length === 0) return;

    this.activeSlide.update((current) => (current === 0 ? slides.length - 1 : current - 1));
  }

  nextSlide(): void {
    const slideCount = this.slides().length;
    if (slideCount === 0) return;

    this.activeSlide.update((current) => (current + 1) % slideCount);
  }

  selectSlide(index: number): void {
    if (index >= 0 && index < this.slides().length) {
      this.activeSlide.set(index);
    }
  }

  tabId(index: number): string {
    return `${this.idPrefix}-tab-${index}`;
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previousSlide();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextSlide();
    }
  }
}
