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
               <img ref="filePreviewImg" v-if="store.user?.avatar?.url" :src="store.user?.avatar?.url" alt="">
               <span v-else-if="store?.user?.firstname?.length">{{ store?.user?.firstname[0] }}</span>
               <!-- <span v-else>A</span> -->
            </div>
            <div>
               <span>{{ store?.user?.firstname }}</span>
               <input v-maska="'+7 (###) ###-##-##'" type="text" :value="store?.user?.phonenumber"
                  style="pointer-events: none;">
            </div>
            <ArrowIcon class="account-link__arrow" />
         </NuxtLink>
      </div>
   </aside>
</template>
<script setup>
import { vMaska } from "maska/vue"
import ExitIcon from '@/assets/img/icons/exit.svg'
import ArrowIcon from "@/assets/img/icons/arrow_down.svg"
import { useAccount } from '~/store/account';
const store = useAccount()
const router = useRouter()
const clientsLength = computed(() => {
   return store.user?.clients?.length || 0;
})
const docsLength = computed(() => {
   return store.user?.documents?.length || 0;
})
// const links = ref([
//    {
//       icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/account-users.svg'))),
//       title: "Мои клиенты",
//       to: "/account/clients",
//       subtitle: `${clientsLength.value} ${morph(clientsLength.value, ['клиент', 'клиента', 'клиентов'])}`
//    },
//    {
//       icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/account-doc.svg'))),
//       title: "Документы",
//       to: "/account/documents",
//       subtitle: `${docsLength.value} ${morph(docsLength.value, ['документ', 'документа', 'документов'])}`
//    },
//    {
//       icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/account-info.svg'))),
//       title: "Информация",
//       to: "/account/info",
//    },
// ])
const links = computed(() => {
   return [
      {
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/account-users.svg'))),
         title: "Мои клиенты",
         to: "/account/clients",
         subtitle: `${clientsLength.value} ${morph(clientsLength.value, ['клиент', 'клиента', 'клиентов'])}`
      },
      {
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/account-doc.svg'))),
         title: "Документы",
         to: "/account/documents",
         subtitle: `${docsLength.value} ${morph(docsLength.value, ['документ', 'документа', 'документов'])}`
      },
      // {
      //    icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/account-info.svg'))),
      //    title: "Информация",
      //    to: "/account/info",
      // },
   ]
})
const exit = () => {
   store.exit()
   router.push('/')
}
</script>