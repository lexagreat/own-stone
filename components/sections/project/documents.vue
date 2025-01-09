<template>
   <section class="project-documents">
      <div class="container">
         <div class="project-documents__wrapper">
            <h2 class="project-documents__title h1">Документы</h2>
            <ul class="project-documents__list">
               <li v-for="item in documents" :key="item">
                  <CardsDocument :info="item" />
               </li>
            </ul>
         </div>
      </div>
   </section>
</template>
<script setup>
const props = defineProps({
   documents: Array
})
const docs = ref([
   { name: "Разрешение на строительство" },
   { name: "Проектная декларация" },
   { name: "Извещение о начале строительства" },
   { name: "Извещение о начале строительства" },
   { name: "Извещение о начале строительства" },
   { name: "Извещение о начале строительства" },
   { name: "Извещение о начале строительства" },
   { name: "Извещение о начале строительства" },
])

</script>