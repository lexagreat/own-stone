<template>
   <header class="header lock-padding">
      <div class="container">
         <div class="header__wrapper">
            <div class="header__info">
               <NuxtLink to="/" class="header__logo">
                  <LogoIcon />
               </NuxtLink>
               <span class="border desktop"></span>
               <div class="header__schedule">
                  <span>Нащокинский пер., 8</span>
                  <span>Ежедневно: 10:00 – 20:00</span>
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
                     <NuxtLink to="/" class="header__call">
                        Заказать звонок
                     </NuxtLink>
                  </li>
                  <li>
                     <ul class="header__icons">
                        <li>
                           <NuxtLink class="circle">
                              <TgIcon />
                           </NuxtLink>
                        </li>
                        <li>
                           <NuxtLink class="circle">
                              <WhatsappIcon />
                           </NuxtLink>
                        </li>
                     </ul>
                  </li>
               </ul>
               <span class="border desktop"></span>
               <ul class="header__icons">
                  <li>
                     <NuxtLink class="circle" to="/favorites">
                        <HeartIcon />
                     </NuxtLink>
                  </li>
                  <li>
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
            <div class="header__schedule">
               <span>Нащокинский пер., 8</span>
               <span>Ежедневно: 10:00 – 20:00</span>
            </div>
            <div class="header-menu__form">
               <span>Связаться с нами</span>
               <ul>
                  <li>
                     <a href="tel:+7 (993) 338-07 07">+7 (993) 338-07 07</a>
                  </li>
                  <ul class="header__icons">
                     <li>
                        <NuxtLink class="circle">
                           <TgIcon />
                        </NuxtLink>
                     </li>
                     <li>
                        <NuxtLink class="circle">
                           <WhatsappIcon />
                        </NuxtLink>
                     </li>
                  </ul>
               </ul>
               <UiButton class="white">Заказать звонок</UiButton>
            </div>
         </div>
      </div>
   </header>
</template>
<script setup>
import TgIcon from '~/assets/img/icons/tg.svg'
import WhatsappIcon from '~/assets/img/icons/whatsapp.svg'
import HeartIcon from '~/assets/img/icons/heart.svg'
import ProfileIcon from '~/assets/img/icons/user.svg'
import LogoIcon from '~/assets/img/icons/logo.svg'
import { bodyLock, bodyUnlock } from '~/utils/bodyLocker'
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


watch(route.fullPath, () => {
   isBurgerOpen.value = false
})


const onClickProfile = () => {
   if (window?.innerWidth <= 1024) {
      isOpenAuthHint.value = true
   }
}
</script>