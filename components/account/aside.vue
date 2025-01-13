<template>
   <aside class="account-aside">
      <ul class="account-aside__list">
         <li v-for="link in links" :key="link">
            <NuxtLink class="account-aside__link account-link" :to="link.to" @click="store.closeAside">
               <component :is="link.icon" class="account-link__icon" />
               <div class="account-link__info">
                  <span class="account-link__title">{{ link.title }}</span>
                  <span class="account-link__subtitle" v-if="link?.subtitle">{{ link.subtitle }}</span>
               </div>
               <ArrowIcon class="account-link__arrow" />
            </NuxtLink>
         </li>
         <li>
            <button class="account-aside__link account-link account-aside__exit" @click="exit">
               <ExitIcon />
               <div class="account-link__info">
                  <span class="account-link__title">Выйти</span>
               </div>
               <ArrowIcon class="account-link__arrow" />
            </button>
         </li>
      </ul>
      <div class="account-aside__footer">
         <NuxtLink to="/account" class="account-aside__main" @click="store.closeAside">
            <div class="circle">
               <AccountAvatar />
            </div>
            <div>
               <span>Андрей</span>
               <span>{{ store?.user?.phonenumber }}</span>
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
import { useAccount } from '~/store/account';
const store = useAccount()
const router = useRouter()
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
const exit = () => {
   store.exit()
   router.push('/')
}
</script>