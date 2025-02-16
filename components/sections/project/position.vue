<template>
   <section class="project-position">
      <div class="container">
         <div class="project-position__wrapper">
            <div class="project-position__header">
               <h2 class="project-position__title light-title h1">Расположение</h2>
               <UiButton class="white">Записаться на экскурсию</UiButton>
            </div>
            <div class="project-position__main">
               <ul class="project-position__categories">
                  <li v-for="cat in cats.options" :key="cat">
                     <input v-model="currentCat" type="radio" :value="cat.value" name="projectPosition"
                        :id="`projectposition${cat.name}`">
                     <label :for="`projectposition${cat.name}`">
                        <div class="circle">
                           <component :is="cat.icon" />
                        </div>
                        <span>{{ cat.name }}</span>
                     </label>
                  </li>
               </ul>
               <div class="project-position__map">
                  <MapsCatsSelect :settings="cats" @selectOption="onSelectCat" />
                  <MapsProject :info="contacts?.info?.contacts_info" />
               </div>

            </div>
            <UiButton class="white">Записаться на экскурсию</UiButton>
         </div>
      </div>
   </section>
</template>
<script setup>
import { useContacts } from '~/store/contacts';
const contacts = useContacts()
const cats = ref({
   options: [
      {
         name: "Все объекты",
         value: "Все объекты",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position1.svg'))),
         selected: true
      },
      {
         name: " Транспорт",
         value: " Транспорт",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position2.svg'))),
      },
      {
         name: "Метро",
         value: "Метро",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position3.svg'))),
      },
      {
         name: "Культура",
         value: "Культура",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position4.svg'))),
      },
      {
         name: "Кафе и рестораны",
         value: "Кафе и рестораны",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position5.svg'))),
      },
      {
         name: "Парки",
         value: "Парки",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position6.svg'))),
      },
      {
         name: "Образование",
         value: "Образование",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position7.svg'))),
      },
      {
         name: "Спорт",
         value: "Спорт",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position8.svg'))),
      },
      {
         name: "Магазины",
         value: "Магазины",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position9.svg'))),
      },
      {
         name: "Здоровье",
         value: "Здоровье",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position10.svg'))),
      },
      {
         name: "Красота и уход",
         value: "Красота и уход",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position11.svg'))),
      },
   ],
   placeholder: ""
})
const currentCat = ref("Все объекты")
function onSelectCat(option) {
   currentCat.value = option.name
}



</script>