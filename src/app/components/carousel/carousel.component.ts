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
  readonly zoomScale: number;
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
  readonly zoomScale = signal(1);
  readonly zoomPercentage = computed(() => Math.round(this.zoomScale() * 100));
  readonly minZoom = 0.8;
  readonly maxZoom = 2;
  readonly zoomStep = 0.2;

  readonly slideTemplate = contentChild<TemplateRef<CarouselTemplateContext>>('slideContent');
  readonly currentSlide = computed(() => this.slides()[this.activeSlide()] ?? null);
  readonly panelId = computed(() => `${this.idPrefix}-panel-${this.activeSlide()}`);

  private readonly idPrefix = `carousel-${++carouselId}`;

  previousSlide(): void {
    const slides = this.slides();
    if (slides.length === 0) return;

    this.activeSlide.update((current) => (current === 0 ? slides.length - 1 : current - 1));
    this.resetZoom();
  }

  nextSlide(): void {
    const slideCount = this.slides().length;
    if (slideCount === 0) return;

    this.activeSlide.update((current) => (current + 1) % slideCount);
    this.resetZoom();
  }

  selectSlide(index: number): void {
    if (index >= 0 && index < this.slides().length) {
      this.activeSlide.set(index);
      this.resetZoom();
    }
  }

  zoomIn(): void {
    this.zoomScale.update((current) => Math.min(this.maxZoom, current + this.zoomStep));
  }

  zoomOut(): void {
    this.zoomScale.update((current) => Math.max(this.minZoom, current - this.zoomStep));
  }

  private resetZoom(): void {
    this.zoomScale.set(1);
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
