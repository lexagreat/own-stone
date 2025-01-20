export default function (selector) {
   const element = document.querySelector(selector);
   const offset = -80; // Отступ в пикселях
   const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset + offset;

   window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
   });
}
