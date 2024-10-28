import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const parallaxAnimation = () => {
   // console.log("parallax anim");
   const section = document.querySelector(".parallax-section"); // Замените '.your-element' на ваш селектор
   gsap.to(".parallax-section div", {
      scrollTrigger: {
         trigger: section, // элемент, который должен запускать анимацию
         start: "top 80%", // Когда верх элемента достигает 80% высоты экрана
         end: `bottom 0`, // Используем высоту элемента для end
         //markers: true, // включить маркеры для визуальной отладки
         scrub: 1.5,
      },
      y: 0,
   });
};

export const featureAnimation = () => {
   gsap.to(".home-features__parallax", {
      scrollTrigger: {
         trigger: ".home-features", // элемент, который должен запускать анимацию
         start: "top 80%", // Когда верх элемента достигает 80% высоты экрана
         end: `bottom 0`, // Используем высоту элемента для end
         // markers: true, // включить маркеры для визуальной отладки
         scrub: 1.5,
      },
      y: "-10%",
   });
};
