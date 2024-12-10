import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { slideHide, slideShow } from "#build/imports";

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

export const servicesAnimation = () => {
   const bgs = document.querySelectorAll(".services-section__bg");
   const section = document.querySelector(".services-section");
   const spoilers = document.querySelectorAll(".services-section__content");
   const headers = document.querySelectorAll(".services-section__header");
   const sectionHeight = section.clientHeight;
   gsap.to(section, {
      scrollTrigger: {
         trigger: section, // элемент, который должен запускать анимацию
         start: "top top", // Точка начала анимации
         end: `+=${sectionHeight}`, // Конец анимации через высоту секции
         endTrigger: section, // указание родителя для окончания анимации
         // markers: true, // включить маркеры для визуальной отладки
         scrub: 1.5,
      },
      onRefresh: (self) => {
         bgs.forEach((item) => {
            item.classList.remove("hidden");
         });
         slideShow(spoilers[0], 600);
         slideHide(spoilers[1], 600);
         headers[0].classList.add("hidden");
         headers[1].classList.remove("hidden");
      },
      // onUpdate: function () {
      //    // Проверяем прогресс анимации
      //    const progress = this.ratio;
      //    if (progress >= 0 && progress < 0.25) {
      //       bgs.forEach((item) => {
      //          item.classList.remove("active");
      //       });
      //       bgs[0].classList.add("active");
      //       bgs[0].style.transform = `translate(0, ${-100 * this.ratio}%)`;
      //    }
      //    if (progress >= 0.25 && progress < 0.45) {
      //       bgs.forEach((item) => {
      //          item.classList.remove("active");
      //       });
      //       bgs[1].classList.add("active");
      //       bgs[1].style.transform = `translate(0, ${
      //          -100 * (this.ratio - 0.25)
      //       }%)`;
      //    }
      //    if (progress >= 0.45 && progress < 0.65) {
      //       bgs.forEach((item) => {
      //          item.classList.remove("active");
      //       });
      //       bgs[2].classList.add("active");
      //       bgs[2].style.transform = `translate(0, ${
      //          -100 * (this.ratio - 0.5)
      //       }%)`;
      //    }
      //    if (progress >= 0.65) {
      //       bgs.forEach((item) => {
      //          item.classList.remove("active");
      //       });
      //       bgs[3].classList.add("active");
      //       bgs[3].style.transform = `translate(0, ${
      //          -100 * (this.ratio - 0.65)
      //       }%)`;
      //    }
      onUpdate: function () {
         // Проверяем прогресс анимации
         const progress = this.ratio;
         if (progress >= 0 && progress < 0.25) {
            bgs.forEach((item) => {
               item.classList.remove("hidden");
            });
            slideShow(spoilers[0], 600);
            slideHide(spoilers[1], 600);
            headers[0].classList.add("hidden");
            headers[1].classList.remove("hidden");
            bgs[0].style.transform = `translate(0, ${-100 * this.ratio}%)`;
         }
         if (progress >= 0.25 && progress < 0.5) {
            slideHide(spoilers[0], 600);
            slideHide(spoilers[2], 600);
            slideShow(spoilers[1], 600);
            headers[0].classList.remove("hidden");
            headers[2].classList.remove("hidden");
            headers[1].classList.add("hidden");
            bgs[0].classList.add("hidden");
            bgs[1].classList.remove("hidden");
            bgs[1].style.transform = `translate(0, ${
               -100 * (this.ratio - 0.25)
            }%)`;
         }
         if (progress >= 0.5 && progress < 0.72) {
            slideHide(spoilers[1], 600);
            slideHide(spoilers[3], 600);
            slideShow(spoilers[2], 600);
            headers[1].classList.remove("hidden");
            headers[3].classList.remove("hidden");
            headers[2].classList.add("hidden");
            bgs[1].classList.add("hidden");
            bgs[2].classList.remove("hidden");
            bgs[2].style.transform = `translate(0, ${
               -100 * (this.ratio - 0.5)
            }%)`;
         }
         if (progress >= 0.72) {
            slideHide(spoilers[2], 600);
            slideShow(spoilers[3], 600);
            headers[2].classList.remove("hidden");
            headers[3].classList.add("hidden");
            bgs[2].classList.add("hidden");
            bgs[3].style.transform = `translate(0, ${
               -100 * (this.ratio - 0.72)
            }%)`;
         }
      },
   });
   // gsap.to(bgs[0], {
   //    scrollTrigger: {
   //       trigger: section, // элемент, который должен запускать анимацию
   //       start: "top top", // Точка начала анимации
   //       end: `+=100vh`, // Конец анимации через высоту секции
   //       endTrigger: section, // указание родителя для окончания анимации
   //       // markers: true, // включить маркеры для визуальной отладки
   //       scrub: 1.5,
   //    },
   //    y: "-10%",
   // });
};
