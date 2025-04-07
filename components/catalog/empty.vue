<template>
   <div class="catalog-empty">
      <h2 class="catalog-empty__title h1 dark-title">
         по данному запросу <br> <span>предложения не найдены</span>
      </h2>
      <div class="catalog-empty__main">
         <p class="body-text">
            Попробуйте изменить параметры или очистить фильтр. Если Вам нужна помощь в выборе объекта - оставьте заявку
            и наш специалист с Вами свяжется в течение 10 минут
         </p>
         <ul class="catalog-empty__btns">
            <UiButton class="black">Оставить заявку</UiButton>
            <UiButton class="white" @click="emit('reset')">Очистить фильтр</UiButton>
         </ul>
      </div>
      <div class="catalog-empty__footer error-page__footer">
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
</template>
<script setup>
import { useContacts } from './store/contacts';

const contacts = useContacts()
let contactsInfo = await contacts.getInfo()


const emit = defineEmits(['reset'])
</script>