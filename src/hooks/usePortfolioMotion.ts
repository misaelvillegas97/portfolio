import type { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mountDisclosureMotion } from '../lib/disclosureMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function usePortfolioMotion(scope: RefObject<HTMLDivElement>) {
  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      if (!scope.current) return;
      const cleanDisclosures = mountDisclosureMotion(scope.current, () => ScrollTrigger.refresh());
      const documentRoot = document.documentElement;
      const pointerNavigation = (event: PointerEvent) => {
        documentRoot.toggleAttribute('data-pointer-navigation', event.target instanceof Element && !!event.target.closest('a[href^="#"]'));
      };
      const keyboardNavigation = () => documentRoot.removeAttribute('data-pointer-navigation');
      document.addEventListener('pointerdown', pointerNavigation);
      document.addEventListener('keydown', keyboardNavigation);
      // Numeric scrub softens wheel steps without replacing native scrolling; CSS owns the hero entrance.
      gsap.utils.toArray<HTMLElement>('.case-study__figure').forEach((figure) => {
        gsap.fromTo(figure, { scale: 0.9, y: 32 }, {
          scale: 1, y: 0, ease: 'none',
          scrollTrigger: { trigger: figure, start: 'top 95%', end: 'center 55%', scrub: 0.6 },
        });
      });
      gsap.fromTo('.method-word', { opacity: 0.65 }, {
        opacity: 1, stagger: 0.12, ease: 'none',
        scrollTrigger: { trigger: '#principles-title', start: 'top 95%', end: 'top 35%', scrub: 0.6 },
      });
      let active = true;
      void document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
      return () => {
        active = false;
        cleanDisclosures();
        document.removeEventListener('pointerdown', pointerNavigation);
        document.removeEventListener('keydown', keyboardNavigation);
        documentRoot.removeAttribute('data-pointer-navigation');
      };
    }, scope);

    return () => media.revert();
  }, { scope });
}
