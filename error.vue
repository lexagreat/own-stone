<template>
   <div class="wrapper lock-padding">
      <NuxtLayout>
         <main class="main">
            <section class="error-page">
               <div class="container">
                  <div class="error-page__wrapper">
                     <h2 class="error-page__title dark-title h1">
                        ошибка <span>404</span>
                     </h2>
                     <div class="error-page__main">
                        <p class="body-text">
                           Такой страницы не существует. Вы можете перейти <br> на главную или выбрать объект
                        </p>
                        <ul class="error-page__btns">
                           <li>
                              <NuxtLink class="btn black" to="/">На главную</NuxtLink>
                           </li>
                           <li>
                              <NuxtLink class="btn white" to="/catalog">Выбрать объект</NuxtLink>
                           </li>
                        </ul>
                     </div>
                     <div class="error-page__footer">
                        <div class="object-form__footer">
                           <span class="body-text">Или свяжитесь с нами</span>
                           <ul>
                              <ul>
                                 <li v-for="item in contacts?.info?.contacts_info?.contacts_info_links" :key="item">
                                    <NuxtLink target="_blank" :to="item?.href_attr" class="circle">
                                       <SvgParser :iconUrl="item.icon?.url" />
                                    </NuxtLink>
                                 </li>
                              </ul>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </main>
      </NuxtLayout>
   </div>
</template>
<script setup>
import { useContacts } from './store/contacts';

const contacts = useContacts()
let contactsInfo = await contacts.getInfo()
</script>
<style lang="scss" scoped>
@import "@/assets/scss/style";
</style>
