import gsap from 'gsap';
import { Animation } from 'animated-router-react';
import { RefObject } from 'react';


export const exitRight: Animation = {
  animation: (ref) => {
    gsap
      .timeline()
      .set(document.body, { overflow: 'hidden' })
      .fromTo(
        ref.current,
        { translateX: '0' },
        { translateX: '-100vw', duration: 0.5 },
      );
  },
  time: 0.5,
};

export const enterRight: Animation = {
  animation: (ref) => {
    gsap
      .timeline()
      .set(document.body, { overflow: 'hidden' })
      .fromTo(
        ref.current,
        { translateX: '100vw' },
        { translateX: '0', duration: 0.5 },
      );
  },
  time: 0.5,
};


export const enterDown: Animation = {
  animation: (ref) => {
    gsap
      .timeline()
      .set(document.body, { overflow: 'hidden' })
      .fromTo(
        ref.current,
        { translateY: '-100vw' },
        { translateY: '0', duration: 1 },
      )
  },
  cleanup: () => {
    document.body.style.overflow = "visible"
  },
  time: 1,
  startWhenPrevious: 0,
}

export const enterUp = (header: RefObject<HTMLDivElement>) => ({
  animation: (ref: RefObject<HTMLElement>) => {
    header.current?.style.setProperty('height', 'calc(var(--background-size) + 50px)');

    gsap
      .timeline()
      .set(document.body, { overflow: 'hidden' })
      .fromTo(
        ref.current,
        { translateY: '100vh' },
        { translateY: '0', duration: 1 },
      )
  },
  cleanup: () => {
    document.body.style.overflow = "visible"
  },
  time: 1,
  startWhenPrevious: 0,
});

export const exitUp: Animation = {
  animation: (ref) => {
    gsap
      .timeline()
      .set(document.body, { overflow: 'hidden' })
      .fromTo(
        ref.current,
        { translateY: '0' },
        { translateY: '-100vh', duration: 1 },
      )
      .set(document.body, { overflow: 'visible' }, '+=0.2');
  },
  time: 1,
  startWhenPrevious: 0,
};

export const exitDown = (header: RefObject<HTMLDivElement>) => ({
  animation: (ref: RefObject<HTMLElement>) => {
    header.current?.style.setProperty('height', '100%');

    gsap
      .timeline()
      .set(document.body, { overflow: 'hidden' })
      .fromTo(
        ref.current,
        { translateY: '0' },
        { translateY: '100vh', duration: 1 },
      )
      .set(document.body, { overflow: 'visible' }, '+=0.2');
  },
  time: 1,
  startWhenPrevious: 0,
});