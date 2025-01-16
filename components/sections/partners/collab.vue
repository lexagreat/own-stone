<template>
   <section class="partners-collab">
      <div class="container">
         <div class="partners-collab__wrapper">
            <div class="partners-collab__header">
               <h2 class="partners-collab__title h1 dark-title" v-html="info.title"></h2>
               <NuxtLink class="btn black" to="/account" v-if="account.user?.phonenumber">Стать партнером
               </NuxtLink>
               <UiButton class="black" @click="isOpenAuthModal = true" v-else>Стать партнером
               </UiButton>
            </div>
            <div class="partners-collab__main">
               <ul class="partners-collab__list">
                  <li class="partners-collab__item collab-item" v-for="(item, index) in info.partners_collab_list"
                     :key="item">
                     <div class="collab-item__header h3" :class="{ 'active': index == 0 }"
                        @click="setOutput(item.status_text)">
                        {{ item.title }}
                     </div>
                     <div class="collab-item__spoiler collapse body-text" :class="{ 'collapse_show': index == 0 }">
                        <p>{{ item.text }}</p>
                     </div>
                  </li>
               </ul>
               <UiButton class="black">
                  Стать партнером
               </UiButton>
               <div class="partners-collab__image">
                  <div class="partners-collab__visual">
                     <div class="circle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none">
                           <g clip-path="url(#clip0_932_21285)">
                              <path
                                 d="M18.224 23.7999V21.6222C18.224 20.467 17.7651 19.3591 16.9482 18.5423C16.1314 17.7255 15.0236 17.2666 13.8684 17.2666H6.24618C5.09102 17.2666 3.98316 17.7255 3.16634 18.5423C2.34951 19.3591 1.89063 20.467 1.89062 21.6222V23.7999"
                                 stroke="white" stroke-width="1.68" stroke-linecap="round" stroke-linejoin="round" />
                              <path
                                 d="M10.0548 4.19971C8.89961 4.19971 7.79176 4.65859 6.97493 5.47542C6.15811 6.29224 5.69922 7.4001 5.69922 8.55526C5.69922 9.71043 6.15811 10.8183 6.97493 11.6351C7.79176 12.4519 8.89961 12.9108 10.0548 12.9108C11.2099 12.9108 12.3178 12.4519 13.1346 11.6351C13.9514 10.8183 14.4103 9.71043 14.4103 8.55526C14.4103 7.4001 13.9514 6.29224 13.1346 5.47542C12.3178 4.65859 11.2099 4.19971 10.0548 4.19971Z"
                                 stroke="white" stroke-width="1.68" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M22.5781 9.64404V16.1774" stroke="white" stroke-width="1.68"
                                 stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M25.8419 12.9106H19.3086" stroke="white" stroke-width="1.68"
                                 stroke-linecap="round" stroke-linejoin="round" />
                           </g>
                           <defs>
                              <clipPath id="clip0_932_21285">
                                 <rect width="26.1333" height="26.1333" fill="white"
                                    transform="translate(0.800781 0.933105)" />
                              </clipPath>
                           </defs>
                        </svg>
                     </div>
                     <div class="partners-collab__card">
                        <ul>
                           <li>
                              <span>Ваше имя</span>
                              <p>
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                    fill="none">
                                    <path
                                       d="M12.998 13.6257V12.334C12.998 11.6488 12.7259 10.9917 12.2414 10.5072C11.7569 10.0227 11.0997 9.75049 10.4146 9.75049H5.24756C4.56237 9.75049 3.90525 10.0227 3.42075 10.5072C2.93625 10.9917 2.66406 11.6488 2.66406 12.334V13.6257"
                                       stroke="black" stroke-opacity="0.3" stroke-width="1.3" stroke-linecap="round"
                                       stroke-linejoin="round" />
                                    <path
                                       d="M7.8335 7.16699C9.26032 7.16699 10.417 6.01032 10.417 4.5835C10.417 3.15667 9.26032 2 7.8335 2C6.40667 2 5.25 3.15667 5.25 4.5835C5.25 6.01032 6.40667 7.16699 7.8335 7.16699Z"
                                       stroke="black" stroke-opacity="0.3" stroke-width="1.3" stroke-linecap="round"
                                       stroke-linejoin="round" />
                                 </svg>
                                 <span>Константин</span>
                              </p>
                           </li>
                           <li>
                              <span>Ваш статус</span>
                              <p>
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                    fill="none">
                                    <path
                                       d="M4.66667 2.66659V1.33325H11.3333V2.66659H13.3377C13.7035 2.66659 14 2.96322 14 3.32885V14.0043C14 14.3701 13.7034 14.6666 13.3377 14.6666H2.66227C2.29651 14.6666 2 14.37 2 14.0043V3.32885C2 2.96309 2.29663 2.66659 2.66227 2.66659H4.66667ZM4.66667 3.99992H3.33333V13.3333H12.6667V3.99992H11.3333V5.33325H4.66667V3.99992ZM6 2.66659V3.99992H10V2.66659H6Z"
                                       fill="black" fill-opacity="0.3" />
                                 </svg>
                                 <span>{{ output }}</span>
                              </p>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <img :src="info.picture.url" alt="">
               </div>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import { accordion } from '~/utils/slideToggle';
import { useAccount } from '~/store/account';
const props = defineProps({
   info: Object
})

const isOpenAuthModal = ref(false)
const account = useAccount()
const output = ref(props.info.partners_collab_list[0].status_text)


onMounted(() => {
   accordion(".collab-item__header", ".collab-item__spoiler")
})

const setOutput = (title) => {
   output.value = title
}
</script>