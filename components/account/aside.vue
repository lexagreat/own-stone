<template>
   <aside class="account-aside">
      <ul class="account-aside__list">
         <li v-for="link in links" :key="link">
            <NuxtLink class="account-aside__link account-link" :to="link.to" @click="aside.closeAside">
               <component :is="link.icon" class="account-link__icon" />
               <div class="account-link__info">
                  <span class="account-link__title">{{ link.title }}</span>
                  <span class="account-link__subtitle" v-if="link?.subtitle">{{ link.subtitle }}</span>
               </div>
               <ArrowIcon class="account-link__arrow" />
            </NuxtLink>
         </li>
         <li>
            <button class="account-aside__link account-link account-aside__exit">
               <ExitIcon />
               <div class="account-link__info">
                  <span class="account-link__title">Выйти</span>
               </div>
               <ArrowIcon class="account-link__arrow" />
            </button>
         </li>
      </ul>
      <div class="account-aside__footer">
         <NuxtLink to="/account" class="account-aside__main" @click="aside.closeAside">
            <div class="circle">
               <AccountAvatar />
            </div>
            <div>
               <span>Андрей</span>
               <span>+7 (960) 456-55-76</span>
            </div>
            <ArrowIcon class="account-link__arrow" />
         </NuxtLink>
      </div>
   </aside>
</template>
<script setup>
import AccountAvatar from '@/assets/img/icons/account-avatar.svg'
import ExitIcon from '@/assets/img/icons/exit.svg'
import ArrowIcon from "@/assets/img/icons/arrow_down.svg"
import { useAside } from '~/store/account';
const aside = useAside()
const links = ref([
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/account-users.svg'))),
      title: "Мои клиенты",
      to: "/account/clients",
      subtitle: "4 клиента"
   },
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/account-doc.svg'))),
      title: "Документы",
      to: "/account/documents",
      subtitle: "1 документ"
   },
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/account-info.svg'))),
      title: "Информация",
      to: "/account/info",
   },
])
</script>