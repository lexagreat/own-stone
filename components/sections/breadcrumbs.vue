<template>
   <section class="breadcrumbs">
      <div class="container">
         <ul class="breadcrumbs__list scrollbar-none">
            <li v-for="item in path">
               <NuxtLink :to="item.to">{{ item.name }}</NuxtLink>
            </li>
         </ul>
      </div>
   </section>
</template>
<script setup>
const props = defineProps({
   path: Array
})

</script>