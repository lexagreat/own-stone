export const bodyLock = () => {
   const lockPaddingValue =
      window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
   if (lockPaddingValue !== "0px") {
      document.querySelectorAll(".lock-padding").forEach((item) => {
         item.style.paddingRight = lockPaddingValue;
      });
   }
   document.querySelector("body").classList.add("lock");
};
export const bodyUnlock = () => {
   document.querySelectorAll(".lock-padding").forEach((item) => {
      item.style.paddingRight = "";
   });
   document.querySelector("body").classList.remove("lock");
};
