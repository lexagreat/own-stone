<template>
   <div class="document-item">
      <div class="document-item__header">
         <span class="document-item__title">{{ info.name }}</span>
         <NuxtLink :to="info.url" download target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <g clip-path="url(#clip0_1122_1262)">
                  <g filter="url(#filter0_d_1122_1262)">
                     <path
                        d="M13 13.25C13 13.5815 12.8683 13.8995 12.6339 14.1339C12.3995 14.3683 12.0815 14.5 11.75 14.5H4.25C3.91848 14.5 3.60054 14.3683 3.36612 14.1339C3.1317 13.8995 3 13.5815 3 13.25"
                        stroke="black" stroke-linecap="square" stroke-linejoin="round" />
                  </g>
                  <path d="M5.5 8.5L8 11L10.5 8.5" stroke="black" stroke-linecap="square" stroke-linejoin="round" />
                  <path d="M8 1.5V10.5" stroke="black" stroke-linecap="square" stroke-linejoin="round" />
               </g>
               <defs>
                  <filter id="filter0_d_1122_1262" x="-2.26923" y="12.75" width="20.5385" height="11.7885"
                     filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                     <feFlood flood-opacity="0" result="BackgroundImageFix" />
                     <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha" />
                     <feOffset dy="4.76923" />
                     <feGaussianBlur stdDeviation="2.38462" />
                     <feComposite in2="hardAlpha" operator="out" />
                     <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                     <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1122_1262" />
                     <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1122_1262" result="shape" />
                  </filter>
                  <clipPath id="clip0_1122_1262">
                     <rect width="16" height="16" fill="white" />
                  </clipPath>
               </defs>
            </svg>
         </NuxtLink>
      </div>
      <div class="document-item__footer"><span style="text-transform: uppercase;">{{ ext }}</span>, {{
         convertKbToMb(info.size) }} MB
      </div>
   </div>
</template>
<script setup>
const props = defineProps({
   info: Object
})

const ext = props.info.ext.replaceAll('.', '')
function convertKbToMb(kb) {
   const mb = kb / 1024;
   return mb.toFixed(2);
}
</script>