<template>
   <div class="consult-icon">
      <div class="consult-icon__preview" v-if="step == 1" @click="step = 2">
         <div class="circle">
            <img src="/img/consult-icon.png" alt="">
         </div>
         <div class="circle" style="background: #4F0014;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <path
                  d="M4.30564 12.6667L1.33594 15V2.66667C1.33594 2.29848 1.63442 2 2.0026 2H14.0026C14.3708 2 14.6693 2.29848 14.6693 2.66667V12C14.6693 12.3682 14.3708 12.6667 14.0026 12.6667H4.30564ZM4.66927 6.66667V8H6.0026V6.66667H4.66927ZM7.33594 6.66667V8H8.66927V6.66667H7.33594ZM10.0026 6.66667V8H11.3359V6.66667H10.0026Z"
                  fill="white" />
            </svg>
         </div>
      </div>
      <div class="consult-icon__content" v-else>
         <UiModalCloseBtn />
         <div class="consult-icon__header">
            <div class="consult-icon__image">
               <div class="circle">
                  <img src="/img/consult-icon.png" alt="">
               </div>
               <div class="circle" style="background-color: #1DC83D;"></div>
            </div>
            <div class="consult-icon__author">
               <p>Персональный брокер</p>
               <span>Доступен 24/7</span>
            </div>
         </div>
         <div class="consult-icon__footer">
            <a :href="'tel:' + contacts?.info?.contacts_info?.phonenumber">{{
               contacts?.info?.contacts_info?.phonenumber }}</a>
            <ul class="consult-icon__media header__icons">
               <li v-if="contacts?.info?.contacts_info?.contacts_info_links[1]?.href_attr?.length">

                  <NuxtLink target="_blank" class="circle"
                     :to="contacts?.info?.contacts_info?.contacts_info_links[1]?.href_attr">
                     <SvgParser :iconUrl="contacts?.info?.contacts_info?.contacts_info_links[1]?.icon?.url" />
                  </NuxtLink>
               </li>
               <li v-if="contacts?.info?.contacts_info?.contacts_info_links[2]?.href_attr?.length">


                  <NuxtLink target="_blank" class="circle"
                     :to="contacts?.info?.contacts_info?.contacts_info_links[2]?.href_attr">
                     <SvgParser :iconUrl="contacts?.info?.contacts_info?.contacts_info_links[2]?.icon?.url" />

                  </NuxtLink>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>
<script setup>
import { useContacts } from '~/store/contacts'

const contacts = useContacts()

const step = ref(1)
</script>
