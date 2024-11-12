<template>
   <section class="buy-ways">
      <div class="container">
         <div class="buy-ways__wrapper">
            <h2 class="buy-ways__title h1 light-title"></h2>
            <div class="buy-ways__main">
               <ul class="app-tabs">
                  <li v-for="item in tabs" :key="item">
                     <input type="radio" name="projectAbout" :value="item.value" :id="'project' + item.value"
                        v-model="tab">
                     <label :for="'project' + item.value">{{ item.name }}</label>
                  </li>
               </ul>
               <div class="buy-ways__row">
               </div>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
const tabs = ref([
   {
      name: "Рассчитайте ипотеку",
      value: 0
   },
   {
      name: "Рассчитайте рассрочку",
      value: 1
   },
])
const tab = ref(0)
</script>