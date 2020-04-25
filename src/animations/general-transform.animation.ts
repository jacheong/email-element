import {
    animation, trigger, animateChild, group,
    transition, animate, style, query, keyframes
  } from '@angular/animations';
  
  export const generalTransform = animation([
    animate(
      '{{ timings }}',
      keyframes([
        style({ transform: '{{transformFrom}}', opacity: 0 }),
        style({ transform: '{{transformTo}}', opacity: 1 })
      ])
    )
  ]);