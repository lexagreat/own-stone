<template>
   <header class="header lock-padding">
      <div class="container">
         <div class="header__wrapper">
            <ModalOrderPhone :is-open="isOrderPhone" @close-popup="isOrderPhone = false" />
            <div class="header__info">
               <NuxtLink to="/" class="header__logo">
                  <LogoIcon />
               </NuxtLink>
               <span class="border desktop"></span>
               <div class="header__schedule">
                  <span>{{ address }}</span>
                  <span>{{ contacts?.info?.contacts_info?.worktime }}</span>
               </div>
            </div>
            <ul class="header__list">
               <li>
                  <NuxtLink to="/catalog">Купить</NuxtLink>
               </li>
               <li>
                  <NuxtLink to="/sell">Продать</NuxtLink>
               </li>
               <li>
                  <NuxtLink to="/services">Услуги</NuxtLink>
               </li>
               <li>
                  <NuxtLink to="/partners">Партнерам</NuxtLink>
               </li>
               <li>
                  <NuxtLink to="/about">О нас</NuxtLink>
               </li>
               <li>
                  <NuxtLink to="/contacts">Контакты</NuxtLink>
               </li>
            </ul>
            <div class="header__actions">
               <ul class="header__items">
                  <li>
                     <NuxtLink style="cursor: pointer;" class="header__call" @click.prevent="isOrderPhone = true">
                        Заказать звонок
                     </NuxtLink>
                  </li>
                  <li>
                     <ul class="header__icons">
                        <li>

                           <a target="_blank" class="circle"
                              :href="contacts?.info?.contacts_info?.contacts_info_links[1]?.href_attr">
                              <SvgParser :iconUrl="contacts?.info?.contacts_info?.contacts_info_links[1]?.icon?.url" />
                           </a>
                        </li>
                        <li>


                           <a target="_blank" class="circle"
                              :href="contacts?.info?.contacts_info?.contacts_info_links[2]?.href_attr">
                              <SvgParser :iconUrl="contacts?.info?.contacts_info?.contacts_info_links[2]?.icon?.url" />

                           </a>
                        </li>
                     </ul>
                  </li>
               </ul>
               <span class="border desktop"></span>
               <ul class="header__icons">
                  <li>
                     <NuxtLink class="circle" to="/favorites" style="position: relative;">
                        <div class="circle favor" v-if="emptyFavor"></div>
                        <HeartIcon />
                     </NuxtLink>
                  </li>
                  <li :class="{ active: store.user?.phonenumber }">
                     <div class="circle profile" style="position: relative;">
                        <ProfileIcon @click="onClickProfile" />
                        <div class="header-profile">
                           <h4 class="h4">Личный кабинет партнера</h4>
                           <p>Передайте клиента в наше агентство и получите вознаграждение в размере 30% от общей
                              комиссии по факту реализованной сделки</p>
                           <UiButton class="black" @click="isOpenAuthModal = true">Войти или зарегистрироваться
                           </UiButton>
                        </div>
                     </div>
                     <ModalAuthCollection :isOpen="isOpenAuthModal" @close="isOpenAuthModal = false"
                        @open="isOpenAuthModal = true" />
                     <ModalAuthHint :isOpen="isOpenAuthHint" @close="isOpenAuthHint = false"
                        @openAuth="isOpenAuthHint = false, isOpenAuthModal = true" />
                  </li>
               </ul>
               <span class="border mobile"></span>
               <ul class="header__icons mobile">
                  <li>
                     <button class="circle header__burger" :class="{ active: isBurgerOpen }"
                        @click="isBurgerOpen = !isBurgerOpen">
                        <span></span>
                     </button>
                  </li>

               </ul>
            </div>
         </div>
         <div class="header-menu scrollbar-none" :class="{ active: isBurgerOpen }">
            <ul class="header-menu__list">
               <li>
                  <NuxtLink to="/catalog">Купить</NuxtLink>
               </li>
               <li>
                  <NuxtLink to="/sell">Продать</NuxtLink>
               </li>
               <li>
                  <NuxtLink to="/services">Услуги</NuxtLink>
               </li>
               <li>
                  <NuxtLink to="/partners">Партнерам</NuxtLink>
               </li>
               <li>
                  <NuxtLink to="/about">О нас</NuxtLink>
               </li>
               <li>
                  <NuxtLink to="/contacts">Контакты</NuxtLink>
               </li>
            </ul>
            <div class="header__schedule" style="flex: 1;">
               <span>{{ contacts?.info?.contacts_info?.address_string }}</span>
               <span>{{ contacts?.info?.contacts_info?.worktime }}</span>
            </div>
            <div class="header-menu__form">
               <span>Связаться с нами</span>
               <ul>
                  <li>
                     <a :href="'tel:' + contacts?.info?.contacts_info?.phonenumber">{{
                        contacts?.info?.contacts_info?.phonenumber }}</a>
                  </li>
                  <ul class="header__icons">
                     <li v-if="contacts?.info?.contacts_info?.contacts_info_links[1]?.icon?.url?.length">
                        <a target="_blank" class="circle"
                           :href="contacts?.info?.contacts_info?.contacts_info_links[1]?.href_attr">
                           <!-- <TgIcon /> -->
                           <SvgParser :iconUrl="contacts?.info?.contacts_info?.contacts_info_links[1]?.icon?.url" />
                        </a>
                     </li>
                     <li v-if="contacts?.info?.contacts_info?.contacts_info_links[2]?.icon?.url?.length">
                        <a target="_blank" class="circle"
                           :href="contacts?.info?.contacts_info?.contacts_info_links[2]?.href_attr">
                           <!-- <WhatsappIcon /> -->
                           <SvgParser :iconUrl="contacts?.info?.contacts_info?.contacts_info_links[2]?.icon?.url" />

                        </a>
                     </li>
                  </ul>
               </ul>
               <UiButton class="white" @click="isOrderPhone = true">Заказать звонок</UiButton>
            </div>
         </div>
      </div>
   </header>
</template>
<script setup>
import HeartIcon from '~/assets/img/icons/heart.svg'
import ProfileIcon from '~/assets/img/icons/user.svg'
import LogoIcon from '~/assets/img/icons/logo.svg'
// import TgIcon from '@/assets/img/icons/tg.svg'
// import WhatsappIcon from '@/assets/img/icons/whatsapp.svg'
import { bodyLock, bodyUnlock } from '~/utils/bodyLocker'
import { useContacts } from '~/store/contacts'
import { useAccount } from '~/store/account'
import { useFavorites } from '~/store/favorites'
const favorites = useFavorites()
const router = useRouter()
const store = useAccount()
const contacts = useContacts()
const isBurgerOpen = ref(false)
const route = useRoute()
const isOpenAuthModal = ref(false)
const isOpenAuthHint = ref(false)
watch(isBurgerOpen, (value) => {
   if (value) {
      bodyLock()
   } else {
      bodyUnlock()
   }
})

const isOrderPhone = ref(false)
watch(() => route.fullPath, () => {
   isBurgerOpen.value = false
})


const onClickProfile = () => {
   if (store.user) {
      router.push('/account')
   } else {
      if (window?.innerWidth <= 1024) {
         isOpenAuthHint.value = true
      }
   }
}
const address = computed(() => {
   return contacts?.info?.contacts_info?.address_string.split(',').slice(1).join('')
})

const emptyFavor = computed(() => {
   return favorites.build.projects.length || favorites.build.apartaments.length || favorites.commerce.projects.length || favorites.commerce.apartaments.length || favorites.secondary.length
})
</script>

<style lang="scss">
.circle.favor {
   position: absolute;
   top: 6px;
   right: 6px;
   background-color: #4F0014;
   --size: 4px;
}
</style>