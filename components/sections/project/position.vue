<template>
   <section class="project-position">
      <ModalExcursion :project="project" :isOpen="isOpen" :image="image" @closePopup="isOpen = false" />
      <div class="container">
         <div class="project-position__wrapper">
            <div class="project-position__header">
               <h2 class="project-position__title light-title h1">Расположение {{ projectCoords }}
               </h2>
               <UiButton class="white" @click="isOpen = true">Записаться на экскурсию</UiButton>
            </div>
            <div class="project-position__main">
               <ul class="project-position__categories">
                  <li v-for="cat in filteredCats.options" :key="cat">
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
                  <MapsCatsSelect :settings="filteredCats" @selectOption="onSelectCat" />

                  <MapsProject :info="currentCatItems" :center="JSON.parse(currentCatItems[0].coords)" />
               </div>

            </div>
            <UiButton class="white">Записаться на экскурсию</UiButton>
         </div>
      </div>
   </section>
</template>
<script setup>
const props = defineProps({
   info: Array,
   image: String,
   project: String,
   projectCoords: String

})
const cats = ref({
   options: [
      {
         name: "Все объекты",
         value: "Все объекты",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position1.svg'))),
         selected: true,
         items: []
      },
      {
         name: " Транспорт",
         value: " Транспорт",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position2.svg'))),
         items: []
      },
      {
         name: "Метро",
         value: "Метро",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position3.svg'))),
         items: []
      },
      {
         name: "Культура",
         value: "Культура",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position4.svg'))),
         items: []
      },
      {
         name: "Кафе и рестораны",
         value: "Кафе и рестораны",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position5.svg'))),
         items: []
      },
      {
         name: "Парки",
         value: "Парки",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position6.svg'))),
         items: []
      },
      {
         name: "Образование",
         value: "Образование",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position7.svg'))),
         items: []
      },
      {
         name: "Спорт",
         value: "Спорт",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position8.svg'))),
         items: []
      },
      {
         name: "Магазины",
         value: "Магазины",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position9.svg'))),
         items: []
      },
      {
         name: "Здоровье",
         value: "Здоровье",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position10.svg'))),
         items: []
      },
      {
         name: "Красота и уход",
         value: "Красота и уход",
         icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position11.svg'))),
         items: []
      },
   ],
   placeholder: ""
})
const currentCat = ref("Все объекты")
function onSelectCat(option) {
   currentCat.value = option.name
}
const setItems = () => {
   props.info.forEach(item => {
      if (item.title == 'Транспорт') {
         cats.value.options[1].items = item.coords_array
      }
      if (item.title == 'Метро') {
         cats.value.options[2].items = item.coords_array

      }
      if (item.title == 'Культура') {
         cats.value.options[3].items = item.coords_array

      }
      if (item.title == 'Кафе и рестораны') {
         cats.value.options[4].items = item.coords_array

      }
      if (item.title == 'Парки') {
         cats.value.options[5].items = item.coords_array

      }
      if (item.title == 'Образование') {
         cats.value.options[6].items = item.coords_array

      }
      if (item.title == 'Спорт') {
         cats.value.options[7].items = item.coords_array

      }
      if (item.title == 'Магазины') {
         cats.value.options[8].items = item.coords_array

      }
      if (item.title == 'Здоровье') {
         cats.value.options[9].items = item.coords_array

      }
      if (item.title == 'Красота и уход') {
         cats.value.options[10].items = item.coords_array
      }
   })
   cats.value.options[0].items = props.info.flatMap(category =>
      category.coords_array)
}
watch(() => props.info, (value) => {
   setItems()
}, {
   immediate: true
})


const filteredCats = computed(() => {
   return {
      options: cats.value.options.filter(item => item.items.length > 0)
   }
})
const getIcon = (id) => {
   let res = markRaw(defineAsyncComponent(() => import('@/assets/img/icons/position1.svg')))
   cats.value.options.slice(1).forEach(cat => {
      if (cat.items.some(item => item.id == id)) {
         res = cat.icon;
      }
   })
   return res;
}
const currentCatItems = computed(() => {
   let arr = filteredCats.value.options.find(item => item.name == currentCat.value).items.map(item => {
      return {
         id: item.id,
         coords: item.coords,
         icon: getIcon(item.id),
         title: item.title
      }
   }).filter(item => {
      try {
         return Boolean(JSON.parse(item?.coords));
      } catch {
         return false;
      }
   })
   arr.unshift({
      coords: props.projectCoords,
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/project-map-icon.svg'))),
      title: props.project
   })

   return arr;

})


const isOpen = ref(false)
</script>