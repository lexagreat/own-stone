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
         // markers: true, // включить маркеры для визуальной отладки
         scrub: 1.5,
      },
      y: 0,
   });
};
export const sharedParallaxAnimation = (itemSelector, thriggerSelector) => {
   gsap.to(itemSelector, {
      scrollTrigger: {
         trigger: thriggerSelector, // элемент, который должен запускать анимацию
         start: "top 80%", // Когда верх элемента достигает 80% высоты экрана
         end: `bottom 0`, // Используем высоту элемента для end
         // markers: true, // включить маркеры для визуальной отладки
         scrub: 1.5,
      },
      y: "-10%",
   });
};
export const stickyForCursor = (sectionSelector, itemSelector) => {
   const section = document.querySelector(sectionSelector);
   const circle = section.querySelector(itemSelector);
   section.onmouseenter = (event) => {
      circle.classList.add("active");
      circle.style.transform = `translate(${event.layerX}px, ${event.layerY}px)`;
   };
   section.onmousemove = (event) => {
      circle.classList.add("active");

      circle.style.transform = `translate(${event.layerX}px, ${event.layerY}px)`;
   };
   section.onmouseleave = (event) => {
      circle.classList.remove("active");

      circle.style.transform = `translate(${event.layerX}px, ${event.layerY}px)`;
   };
};
export const aboutValueAnim = () => {
   const rows = document.querySelectorAll(".about-value__row");

   rows.forEach((row, index) => {
      gsap.to(row, {
         scrollTrigger: {
            trigger: row, // элемент, который должен запускать анимацию
            start: "top 40%", // Когда верх элемента достигает 80% высоты экрана
            end: `top 8%`, // Используем высоту элемента для end
            // markers: true, // включить маркеры для визуальной отладки
            scrub: 1.5,
            onEnter: () => {
               // console.log("onEnter", index);
               rows.forEach((item) => {
                  item.classList.remove("active");
               });
               console.log(rows[index - 1]);
               if (rows[index - 1]) {
                  rows[index - 1].classList.add("hidden-down");
               }
               rows[index].classList.add("active");
               rows[index].classList.remove("hidden-up");
               rows[index].classList.remove("hidden-down");
            },
            onEnterBack: () => {
               // console.log("onEnterBack", index);
               rows.forEach((item) => {
                  item.classList.remove("active");
               });
               if (rows[index + 1]) {
                  rows[index + 1].classList.add("hidden-up");
               }
               rows[index].classList.add("active");
               rows[index].classList.remove("hidden-up");
               rows[index].classList.remove("hidden-down");
            },
         },
      });
   });
};
