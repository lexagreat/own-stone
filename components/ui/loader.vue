<template>
   <div class="loader-wrapper">
      <div class="loader"></div>
   </div>
</template>
<script setup></script>


<style lang="scss">
.loader-wrapper {
   position: fixed;
   z-index: 1000000;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: white;
   display: flex;
   align-items: center;
   justify-content: center;
}

/* HTML: <div class="loader"></div> */
.loader {
   width: 45px;
   height: 30px;
   background:
      linear-gradient(black 0 0) 0 100%/100% 50%,
      linear-gradient(black 0 0) 0 0 /calc(100%/3) 100%;
   background-repeat: no-repeat;
   position: relative;
   clip-path: inset(-100% 0 0 0);
   animation: l2-0 2s infinite steps(4);
}

.loader::before,
.loader::after {
   content: "";
   position: absolute;
   inset: -50% 0 50%;
   background:
      linear-gradient(black 0 0) 0 0 /calc(2*100%/3) 50%,
      linear-gradient(black 0 0) 100% 100%/calc(2*100%/3) 50%;
   background-repeat: no-repeat;
   animation: inherit;
   animation-name: l2-1;
}

.loader::after {
   inset: -100% 0 100%;
   background:
      linear-gradient(black 0 0) 0 0/100% 50%,
      linear-gradient(black 0 0) 100% 0/calc(100%/3) 100%;
   background-repeat: no-repeat;
   animation-name: l2-2;
}

@keyframes l2-0 {
   0% {
      transform: translateY(-250%);
      clip-path: inset(100% 0 0 0)
   }

   25%,
   100% {
      transform: translateY(0);
      clip-path: inset(-100% 0 0 0)
   }
}

@keyframes l2-1 {

   0%,
   25% {
      transform: translateY(-250%)
   }

   50%,
   100% {
      transform: translateY(0)
   }
}

@keyframes l2-2 {

   0%,
   50% {
      transform: translateY(-250%)
   }

   75%,
   100% {
      transform: translateY(0)
   }
}
</style>